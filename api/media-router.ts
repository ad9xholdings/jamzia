/* ═══════════════════════════════════════════════════════════
   Media Router — JamDAVE™ DAW Asset Management · Pro Tools · Studio One · Logic
   Presigned URLs, Playback, CRUD
   ═══════════════════════════════════════════════════════════ */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { mediaAssets } from "../db/schema";
import { eq, desc, and, sql } from "drizzle-orm";

/* ── Presigned URL generation (mock for now, real JamDAVE™ integration ready) ── */
function generatePresignedUrl(bucket: string, key: string, operation: "put" | "get", expiresIn = 3600) {
  /* In production: use AWS SDK or MinIO client to generate real presigned URLs */
  const endpoint = process.env.STORAGE_ENDPOINT || "https://storage.jamzia.tv";
  const token = Buffer.from(`${bucket}:${key}:${Date.now()}:${operation}`).toString("base64");
  return `${endpoint}/${bucket}/${key}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jamzia/${operation}/${token}&X-Amz-Expires=${expiresIn}`;
}

export const mediaRouter = createRouter({
  /* ── List user's media ── */
  list: authedQuery
    .input(z.object({
      type: z.enum(["video", "audio", "image", "document", "all"]).default("all"),
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().default(0),
    }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const where = input.type === "all"
        ? eq(mediaAssets.userId, ctx.user.id)
        : and(eq(mediaAssets.userId, ctx.user.id), eq(mediaAssets.type, input.type));
      
      const items = await db.select()
        .from(mediaAssets)
        .where(where)
        .orderBy(desc(mediaAssets.createdAt))
        .limit(input.limit)
        .offset(input.offset);
      
      return items;
    }),

  /* ── Get single asset with presigned playback URL ── */
  get: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [asset] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, input.id));
      if (!asset) throw new TRPCError({ code: "NOT_FOUND", message: "Media not found" });
      
      /* Generate fresh playback URL */
      const playbackUrl = asset.storageKey
        ? generatePresignedUrl(asset.storageBucket || "jamzia-media", asset.storageKey, "get", 7200)
        : null;
      
      return { ...asset, playbackUrl };
    }),

  /* ── Create asset record (called before upload) ── */
  create: authedQuery
    .input(z.object({
      title: z.string().min(1).max(255),
      description: z.string().optional(),
      type: z.enum(["video", "audio", "image", "document", "thumbnail"]),
      filename: z.string().min(1),
      sizeBytes: z.number().optional(),
      visibility: z.enum(["public", "unlisted", "private", "subscriber_only"]).default("public"),
      isUgc: z.boolean().default(false),
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const storageKey = `users/${ctx.user.id}/${input.type}/${Date.now()}-${input.filename}`;
      
      const [asset] = await db.insert(mediaAssets).values({
        userId: ctx.user.id,
        title: input.title,
        description: input.description,
        type: input.type,
        storageKey,
        storageBucket: "jamzia-media",
        status: "uploading",
        visibility: input.visibility,
        isUgc: input.isUgc,
        category: input.category,
        tags: input.tags || [],
        sizeBytes: input.sizeBytes,
      }).$returningId();
      
      return { assetId: asset.id, storageKey, uploadUrl: generatePresignedUrl("jamzia-media", storageKey, "put", 3600) };
    }),

  /* ── Update asset metadata ── */
  update: authedQuery
    .input(z.object({
      id: z.number(),
      title: z.string().min(1).max(255).optional(),
      description: z.string().optional(),
      visibility: z.enum(["public", "unlisted", "private", "subscriber_only"]).optional(),
      tags: z.array(z.string()).optional(),
      category: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const { id, ...updates } = input;
      
      await db.update(mediaAssets)
        .set(updates)
        .where(and(eq(mediaAssets.id, id), eq(mediaAssets.userId, ctx.user.id)));
      
      return { success: true };
    }),

  /* ── Delete asset ── */
  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.delete(mediaAssets)
        .where(and(eq(mediaAssets.id, input.id), eq(mediaAssets.userId, ctx.user.id)));
      return { success: true };
    }),

  /* ── Increment view count ── */
  view: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(mediaAssets)
        .set({ viewCount: sql`${mediaAssets.viewCount} + 1` })
        .where(eq(mediaAssets.id, input.id));
      return { success: true };
    }),

  /* ── UGC feed (public content) ── */
  feed: publicQuery
    .input(z.object({
      type: z.enum(["video", "audio", "image", "all"]).default("all"),
      category: z.string().optional(),
      limit: z.number().min(1).max(50).default(20),
      offset: z.number().default(0),
    }))
    .query(async ({ input }) => {
      const db = getDb();
      const where = and(
        eq(mediaAssets.visibility, "public"),
        eq(mediaAssets.status, "ready"),
        input.type !== "all" ? eq(mediaAssets.type, input.type) : undefined,
        input.category ? eq(mediaAssets.category, input.category) : undefined,
      );
      
      const items = await db.select()
        .from(mediaAssets)
        .where(where)
        .orderBy(desc(mediaAssets.createdAt))
        .limit(input.limit)
        .offset(input.offset);
      
      return items;
    }),
});
