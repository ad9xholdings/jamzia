/* ═══════════════════════════════════════════════════════════
   Upload Router — Multipart Upload + Progress Tracking
   JamDAVE™ multipart upload with presigned part URLs
   ═══════════════════════════════════════════════════════════ */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, authedQuery } from "./lib/trpc";
import { getDb } from "./queries/connection";
import { uploadJobs, mediaAssets } from "../db/schema";
import { eq, and, desc } from "drizzle-orm";

/* ── Generate multipart presigned URLs ── */
function generateMultipartUrls(uploadId: string, bucket: string, key: string, totalParts: number, partSize: number) {
  const urls: { partNumber: number; url: string }[] = [];
  for (let i = 1; i <= totalParts; i++) {
    const token = Buffer.from(`${uploadId}:${i}:${Date.now()}`).toString("base64");
    urls.push({
      partNumber: i,
      url: `${process.env.STORAGE_ENDPOINT || "https://storage.jamzia.tv"}/${bucket}/${key}?partNumber=${i}&uploadId=${uploadId}&token=${token}`,
    });
  }
  return urls;
}

export const uploadRouter = createRouter({
  /* ── Initiate multipart upload ── */
  initiate: authedQuery
    .input(z.object({
      filename: z.string().min(1),
      fileSizeBytes: z.number().min(1),
      mimeType: z.string().optional(),
      mediaAssetId: z.number(),
      partSizeBytes: z.number().min(5 * 1024 * 1024).max(100 * 1024 * 1024).default(5 * 1024 * 1024), /* 5MB - 100MB */
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      
      /* Verify asset ownership */
      const [asset] = await db.select().from(mediaAssets)
        .where(and(eq(mediaAssets.id, input.mediaAssetId), eq(mediaAssets.userId, ctx.user.id)));
      if (!asset) throw new TRPCError({ code: "NOT_FOUND", message: "Media asset not found" });
      
      /* Calculate parts */
      const totalParts = Math.ceil(input.fileSizeBytes / input.partSizeBytes);
      if (totalParts > 10000) throw new TRPCError({ code: "BAD_REQUEST", message: "File too large for multipart upload" });
      
      /* Generate upload ID */
      const uploadId = `jamz-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      
      /* Create upload job */
      const [job] = await db.insert(uploadJobs).values({
        userId: ctx.user.id,
        mediaAssetId: input.mediaAssetId,
        uploadId,
        filename: input.filename,
        totalParts,
        partSizeBytes: input.partSizeBytes,
        totalSizeBytes: input.fileSizeBytes,
        status: "pending",
      }).$returningId();
      
      /* Generate presigned URLs for each part */
      const presignedUrls = generateMultipartUrls(uploadId, asset.storageBucket || "jamzia-media", asset.storageKey, totalParts, input.partSizeBytes);
      
      /* Store URLs in job record */
      await db.update(uploadJobs)
        .set({ presignedUrls, status: "in_progress" })
        .where(eq(uploadJobs.id, job.id));
      
      return {
        jobId: job.id,
        uploadId,
        totalParts,
        partSizeBytes: input.partSizeBytes,
        presignedUrls,
      };
    }),

  /* ── Complete part upload ── */
  completePart: authedQuery
    .input(z.object({
      jobId: z.number(),
      partNumber: z.number().min(1),
      etag: z.string(), /* Returned by JamDAVE™ storage node after successful part upload */
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      
      const [job] = await db.select().from(uploadJobs)
        .where(and(eq(uploadJobs.id, input.jobId), eq(uploadJobs.userId, ctx.user.id)));
      if (!job) throw new TRPCError({ code: "NOT_FOUND", message: "Upload job not found" });
      
      /* Update part etag */
      const updatedUrls = job.presignedUrls?.map(p =>
        p.partNumber === input.partNumber ? { ...p, etag: input.etag } : p
      ) || [];
      
      const completedParts = updatedUrls.filter(p => p.etag).length;
      
      await db.update(uploadJobs)
        .set({
          presignedUrls: updatedUrls,
          completedParts,
          status: completedParts >= job.totalParts ? "completed" : "in_progress",
        })
        .where(eq(uploadJobs.id, input.jobId));
      
      /* If all parts complete, mark asset as processing */
      if (completedParts >= job.totalParts) {
        await db.update(mediaAssets)
          .set({ status: "processing" })
          .where(eq(mediaAssets.id, job.mediaAssetId));
      }
      
      return { completedParts, totalParts: job.totalParts, isComplete: completedParts >= job.totalParts };
    }),

  /* ── Abort upload ── */
  abort: authedQuery
    .input(z.object({ jobId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.update(uploadJobs)
        .set({ status: "aborted", failedAt: new Date() })
        .where(and(eq(uploadJobs.id, input.jobId), eq(uploadJobs.userId, ctx.user.id)));
      return { success: true };
    }),

  /* ── Get upload status ── */
  status: authedQuery
    .input(z.object({ jobId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const [job] = await db.select().from(uploadJobs)
        .where(and(eq(uploadJobs.id, input.jobId), eq(uploadJobs.userId, ctx.user.id)));
      if (!job) throw new TRPCError({ code: "NOT_FOUND", message: "Upload job not found" });
      
      return {
        status: job.status,
        completedParts: job.completedParts,
        totalParts: job.totalParts,
        progress: job.totalParts > 0 ? Math.round((job.completedParts / job.totalParts) * 100) : 0,
      };
    }),

  /* ── List user's upload jobs ── */
  list: authedQuery
    .input(z.object({ limit: z.number().min(1).max(50).default(20) }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      return db.select().from(uploadJobs)
        .where(eq(uploadJobs.userId, ctx.user.id))
        .orderBy(desc(uploadJobs.startedAt))
        .limit(input.limit);
    }),
});
