/* ═══════════════════════════════════════════════════════════
   Stream Router — Live Streaming Management
   RTMP ingest, HLS/DASH playback, WebRTC, analytics
   ═══════════════════════════════════════════════════════════ */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { liveStreams, mediaAssets } from "../db/schema";
import { eq, and, desc, sql } from "drizzle-orm";

/* ── Generate stream key ── */
function generateStreamKey(): string {
  return `live_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
}

/* ── Generate RTMP ingest URL ── */
function getRtmpIngestUrl(streamKey: string): string {
  const host = process.env.RTMP_HOST || "rtmp://live.jamzia.tv:1935";
  return `${host}/live/${streamKey}`;
}

/* ── Generate HLS playback URL ── */
function getHlsUrl(streamKey: string): string {
  const host = process.env.HLS_HOST || "https://live.jamzia.tv";
  return `${host}/hls/${streamKey}.m3u8`;
}

export const streamRouter = createRouter({
  /* ── Create a new live stream ── */
  create: authedQuery
    .input(z.object({
      title: z.string().min(1).max(255),
      description: z.string().optional(),
      scheduledStartAt: z.date().optional(),
      scheduledEndAt: z.date().optional(),
      chatEnabled: z.boolean().default(true),
      recordingEnabled: z.boolean().default(true),
      monetizationType: z.enum(["free", "subscriber_only", "pay_per_view", "donation"]).default("free"),
      priceJamCoins: z.string().optional(),
      thumbnailUrl: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const streamKey = generateStreamKey();
      
      const [stream] = await db.insert(liveStreams).values({
        userId: ctx.user.id,
        title: input.title,
        description: input.description,
        streamKey,
        rtmpIngestUrl: getRtmpIngestUrl(streamKey),
        hlsPlaybackUrl: getHlsUrl(streamKey),
        status: "idle",
        scheduledStartAt: input.scheduledStartAt,
        scheduledEndAt: input.scheduledEndAt,
        chatEnabled: input.chatEnabled,
        recordingEnabled: input.recordingEnabled,
        monetizationType: input.monetizationType,
        priceJamCoins: input.priceJamCoins,
        thumbnailUrl: input.thumbnailUrl,
        category: input.category,
        tags: input.tags || [],
      }).$returningId();
      
      return {
        streamId: stream.id,
        streamKey,
        rtmpIngestUrl: getRtmpIngestUrl(streamKey),
        hlsPlaybackUrl: getHlsUrl(streamKey),
        webrtcPlaybackUrl: `${process.env.WEBRTC_HOST || "wss://live.jamzia.tv"}/webrtc/${streamKey}`,
      };
    }),

  /* ── Start streaming (go live) ── */
  goLive: authedQuery
    .input(z.object({ streamId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [stream] = await db.select().from(liveStreams)
        .where(and(eq(liveStreams.id, input.streamId), eq(liveStreams.userId, ctx.user.id)));
      if (!stream) throw new TRPCError({ code: "NOT_FOUND", message: "Stream not found" });
      if (stream.status === "live") throw new TRPCError({ code: "CONFLICT", message: "Already streaming" });
      
      await db.update(liveStreams)
        .set({ status: "live", startedAt: new Date() })
        .where(eq(liveStreams.id, input.streamId));
      
      return {
        status: "live",
        rtmpIngestUrl: stream.rtmpIngestUrl,
        streamKey: stream.streamKey,
        hlsUrl: stream.hlsPlaybackUrl,
      };
    }),

  /* ── End streaming ── */
  endStream: authedQuery
    .input(z.object({ streamId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [stream] = await db.select().from(liveStreams)
        .where(and(eq(liveStreams.id, input.streamId), eq(liveStreams.userId, ctx.user.id)));
      if (!stream) throw new TRPCError({ code: "NOT_FOUND", message: "Stream not found" });
      
      await db.update(liveStreams)
        .set({ status: "ended", endedAt: new Date() })
        .where(eq(liveStreams.id, input.streamId));
      
      /* If recording was enabled, create a media asset for the recording */
      if (stream.recordingEnabled) {
        const recordingStorageKey = `recordings/${ctx.user.id}/${stream.streamKey}_${Date.now()}.mp4`;
        const [asset] = await db.insert(mediaAssets).values({
          userId: ctx.user.id,
          title: `Recording: ${stream.title}`,
          description: stream.description,
          type: "video",
          storageKey: recordingStorageKey,
          storageBucket: "jamzia-recordings",
          status: "processing",
          visibility: "public",
          isUgc: false,
          category: stream.category,
          tags: stream.tags,
        }).$returningId();
        
        await db.update(liveStreams)
          .set({ recordingAssetId: asset.id })
          .where(eq(liveStreams.id, input.streamId));
      }
      
      return { success: true };
    }),

  /* ── Get stream info (public) ── */
  get: publicQuery
    .input(z.object({ streamId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [stream] = await db.select().from(liveStreams).where(eq(liveStreams.id, input.streamId));
      if (!stream) throw new TRPCError({ code: "NOT_FOUND", message: "Stream not found" });
      
      return {
        id: stream.id,
        title: stream.title,
        description: stream.description,
        status: stream.status,
        hlsUrl: stream.hlsPlaybackUrl,
        dashUrl: stream.dashPlaybackUrl,
        webrtcUrl: stream.webrtcPlaybackUrl,
        thumbnailUrl: stream.thumbnailUrl,
        currentViewers: stream.currentViewers,
        totalViewers: stream.totalViewers,
        peakViewers: stream.peakViewers,
        chatEnabled: stream.chatEnabled,
        monetizationType: stream.monetizationType,
        priceJamCoins: stream.priceJamCoins,
        startedAt: stream.startedAt,
        endedAt: stream.endedAt,
        category: stream.category,
        tags: stream.tags,
      };
    }),

  /* ── List active streams (public) ── */
  active: publicQuery
    .input(z.object({
      category: z.string().optional(),
      limit: z.number().min(1).max(50).default(20),
    }))
    .query(async ({ input }) => {
      const db = getDb();
      const where = and(
        eq(liveStreams.status, "live"),
        input.category ? eq(liveStreams.category, input.category) : undefined,
      );
      
      return db.select().from(liveStreams)
        .where(where)
        .orderBy(desc(liveStreams.currentViewers))
        .limit(input.limit);
    }),

  /* ── List user's streams ── */
  myStreams: authedQuery
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      return db.select().from(liveStreams)
        .where(eq(liveStreams.userId, ctx.user.id))
        .orderBy(desc(liveStreams.createdAt))
        .limit(input.limit);
    }),

  /* ── Update viewer count (called by streaming server webhook) ── */
  updateViewers: publicQuery
    .input(z.object({
      streamId: z.number(),
      currentViewers: z.number().min(0),
      totalViewers: z.number().min(0),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [stream] = await db.select().from(liveStreams).where(eq(liveStreams.id, input.streamId));
      if (!stream) throw new TRPCError({ code: "NOT_FOUND", message: "Stream not found" });
      
      const peak = Math.max(stream.peakViewers || 0, input.currentViewers);
      
      await db.update(liveStreams)
        .set({
          currentViewers: input.currentViewers,
          totalViewers: input.totalViewers,
          peakViewers: peak,
        })
        .where(eq(liveStreams.id, input.streamId));
      
      return { success: true, peakViewers: peak };
    }),

  /* ── Delete stream ── */
  delete: authedQuery
    .input(z.object({ streamId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.delete(liveStreams)
        .where(and(eq(liveStreams.id, input.streamId), eq(liveStreams.userId, ctx.user.id)));
      return { success: true };
    }),
});
