/* ═══════════════════════════════════════════════════════════
   JamZia Media Infrastructure — Database Schema
   JamDAVE™ Digital Audio/Video Engine · Pro Tools · Studio One · Logic · Live Streaming · Tiered Billing
   Built by Collective General Technologies, LLC
   ═══════════════════════════════════════════════════════════ */

import { mysqlTable, serial, varchar, text, bigint, timestamp, int, boolean, json, decimal, mysqlEnum, index, uniqueIndex } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

/* ── Users (extends auth system) ── */
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  avatar: varchar("avatar", { length: 500 }),
  tier: mysqlEnum("tier", ["entry", "pro", "master", "prime", "network", "custom"]).default("entry"),
  tierExpiresAt: timestamp("tier_expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

/* ── Media Assets (JamDAVE™ stored files) ── */
export const mediaAssets = mysqlTable("media_assets", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: mysqlEnum("type", ["video", "audio", "image", "document", "thumbnail", "subtitle"]).notNull(),
  mimeType: varchar("mime_type", { length: 100 }),
  storageKey: varchar("storage_key", { length: 500 }).notNull(),
  storageBucket: varchar("storage_bucket", { length: 100 }).default("jamzia-media"),
  storageEndpoint: varchar("storage_endpoint", { length: 255 }).default("storage.jamzia.tv"),
  sizeBytes: bigint("size_bytes", { mode: "number" }),
  durationSeconds: int("duration_seconds"),
  width: int("width"),
  height: int("height"),
  bitrateKbps: int("bitrate_kbps"),
  codec: varchar("codec", { length: 50 }),
  /* Adaptive bitrate variants */
  variants: json("variants").$type<{ resolution: string; storageKey: string; bitrate: number }[]>(),
  /* Thumbnails */
  thumbnailStorageKey: varchar("thumbnail_storage_key", { length: 500 }),
  posterStorageKey: varchar("poster_storage_key", { length: 500 }),
  /* Status */
  status: mysqlEnum("status", ["uploading", "processing", "ready", "failed", "archived"]).default("uploading"),
  visibility: mysqlEnum("visibility", ["public", "unlisted", "private", "subscriber_only"]).default("public"),
  /* Playback */
  hlsUrl: varchar("hls_url", { length: 500 }),
  dashUrl: varchar("dash_url", { length: 500 }),
  playbackUrl: varchar("playback_url", { length: 500 }),
  /* UGC metadata */
  isUgc: boolean("is_ugc").default(false),
  tags: json("tags").$type<string[]>(),
  category: varchar("category", { length: 100 }),
  license: mysqlEnum("license", ["all_rights", "cc_by", "cc_by_sa", "cc_by_nc", "public_domain"]).default("all_rights"),
  /* Analytics */
  viewCount: bigint("view_count", { mode: "number" }).default(0),
  likeCount: bigint("like_count", { mode: "number" }).default(0),
  shareCount: bigint("share_count", { mode: "number" }).default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
}, (table) => [
  index("media_user_idx").on(table.userId),
  index("media_type_idx").on(table.type),
  index("media_status_idx").on(table.status),
  index("media_ugc_idx").on(table.isUgc),
]);

/* ── Upload Jobs (multipart tracking) ── */
export const uploadJobs = mysqlTable("upload_jobs", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "cascade" }),
  mediaAssetId: bigint("media_asset_id", { mode: "number", unsigned: true }).references(() => mediaAssets.id, { onDelete: "cascade" }),
  uploadId: varchar("upload_id", { length: 255 }).notNull(), /* JamDAVE™ multipart upload ID */
  filename: varchar("filename", { length: 255 }).notNull(),
  totalParts: int("total_parts").notNull(),
  completedParts: int("completed_parts").default(0),
  partSizeBytes: bigint("part_size_bytes", { mode: "number" }).default(5 * 1024 * 1024), /* 5MB default */
  totalSizeBytes: bigint("total_size_bytes", { mode: "number" }),
  status: mysqlEnum("status", ["pending", "in_progress", "completed", "failed", "aborted"]).default("pending"),
  presignedUrls: json("presigned_urls").$type<{ partNumber: number; url: string; etag?: string }[]>(),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  failedAt: timestamp("failed_at"),
  errorMessage: text("error_message"),
});

/* ── Live Streams ── */
export const liveStreams = mysqlTable("live_streams", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  streamKey: varchar("stream_key", { length: 255 }).notNull().unique(),
  rtmpIngestUrl: varchar("rtmp_ingest_url", { length: 500 }).notNull(),
  hlsPlaybackUrl: varchar("hls_playback_url", { length: 500 }),
  dashPlaybackUrl: varchar("dash_playback_url", { length: 500 }),
  webrtcPlaybackUrl: varchar("webrtc_playback_url", { length: 500 }),
  /* Stream status */
  status: mysqlEnum("status", ["idle", "live", "ended", "error"]).default("idle"),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
  scheduledStartAt: timestamp("scheduled_start_at"),
  scheduledEndAt: timestamp("scheduled_end_at"),
  /* Viewer analytics */
  peakViewers: int("peak_viewers").default(0),
  totalViewers: int("total_viewers").default(0),
  currentViewers: int("current_viewers").default(0),
  chatEnabled: boolean("chat_enabled").default(true),
  /* Recording */
  recordingEnabled: boolean("recording_enabled").default(true),
  recordingAssetId: bigint("recording_asset_id", { mode: "number", unsigned: true }).references(() => mediaAssets.id),
  /* Monetization */
  monetizationType: mysqlEnum("monetization_type", ["free", "subscriber_only", "pay_per_view", "donation"]).default("free"),
  priceJamCoins: decimal("price_jam_coins", { precision: 18, scale: 8 }),
  /* Thumbnail */
  thumbnailUrl: varchar("thumbnail_url", { length: 500 }),
  category: varchar("category", { length: 100 }),
  tags: json("tags").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

/* ── Tier Configuration ── */
export const tierConfigs = mysqlTable("tier_configs", {
  id: serial("id").primaryKey(),
  tier: mysqlEnum("tier", ["entry", "pro", "master", "prime", "network", "custom"]).notNull().unique(),
  displayName: varchar("display_name", { length: 100 }).notNull(),
  description: text("description"),
  /* Storage limits */
  storageBytes: bigint("storage_bytes", { mode: "number" }).notNull(), /* Max storage */
  uploadMaxFileSize: bigint("upload_max_file_size", { mode: "number" }).notNull(), /* Per-file limit */
  uploadMaxDurationSeconds: int("upload_max_duration_seconds"), /* Video length limit */
  /* Streaming limits */
  streamMaxBitrateKbps: int("stream_max_bitrate_kbps").notNull(),
  streamMaxDurationSeconds: int("stream_max_duration_seconds"),
  streamSimultaneous: int("stream_simultaneous").default(1),
  streamMaxViewers: int("stream_max_viewers"),
  /* ABR settings */
  abrEnabled: boolean("abr_enabled").default(false),
  abrMaxResolutions: int("abr_max_resolutions").default(1),
  /* Pricing */
  monthlyPriceUsd: decimal("monthly_price_usd", { precision: 10, scale: 2 }),
  yearlyPriceUsd: decimal("yearly_price_usd", { precision: 10, scale: 2 }),
  /* Wholesale cost (what Ad9x pays JamDAVE™ / CDN) */
  wholesaleStoragePerGb: decimal("wholesale_storage_per_gb", { precision: 10, scale: 4 }).notNull(),
  wholesaleTransferPerGb: decimal("wholesale_transfer_per_gb", { precision: 10, scale: 4 }).notNull(),
  wholesaleComputePerHour: decimal("wholesale_compute_per_hour", { precision: 10, scale: 4 }),
  /* Markup multiplier (1.25 = 25% markup = what user pays) */
  markupMultiplier: decimal("markup_multiplier", { precision: 5, scale: 2 }).default("1.25"),
  /* Features */
  features: json("features").$type<string[]>(),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

/* ── Billing / Usage Records ── */
export const usageRecords = mysqlTable("usage_records", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "cascade" }),
  tierId: bigint("tier_id", { mode: "number", unsigned: true }).references(() => tierConfigs.id),
  recordType: mysqlEnum("record_type", ["storage", "transfer", "compute", "streaming", "api_call"]).notNull(),
  /* Usage amount */
  bytesUsed: bigint("bytes_used", { mode: "number" }),
  secondsUsed: int("seconds_used"),
  requestsCount: int("requests_count"),
  /* Cost calculation */
  wholesaleCost: decimal("wholesale_cost", { precision: 18, scale: 8 }),
  retailCost: decimal("retail_cost", { precision: 18, scale: 8 }), /* with markup */
  ad9xFeePercent: decimal("ad9x_fee_percent", { precision: 5, scale: 2 }).default("20.00"), /* 20% of gross */
  ad9xFeeAmount: decimal("ad9x_fee_amount", { precision: 18, scale: 8 }),
  jamziaMargin: decimal("jamzia_margin", { precision: 18, scale: 8 }), /* what JamZia keeps */
  /* Context */
  mediaAssetId: bigint("media_asset_id", { mode: "number", unsigned: true }).references(() => mediaAssets.id),
  liveStreamId: bigint("live_stream_id", { mode: "number", unsigned: true }).references(() => liveStreams.id),
  region: varchar("region", { length: 50 }),
  periodStart: timestamp("period_start"),
  periodEnd: timestamp("period_end"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ── Media Comments / Interactions ── */
export const mediaComments = mysqlTable("media_comments", {
  id: serial("id").primaryKey(),
  mediaAssetId: bigint("media_asset_id", { mode: "number", unsigned: true }).references(() => mediaAssets.id, { onDelete: "cascade" }),
  userId: bigint("user_id", { mode: "number", unsigned: true }).references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  parentId: bigint("parent_id", { mode: "number", unsigned: true }),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ── Relations ── */
export const usersRelations = relations(users, ({ many }) => ({
  mediaAssets: many(mediaAssets),
  uploadJobs: many(uploadJobs),
  liveStreams: many(liveStreams),
  usageRecords: many(usageRecords),
}));

export const mediaAssetsRelations = relations(mediaAssets, ({ one, many }) => ({
  user: one(users, { fields: [mediaAssets.userId], references: [users.id] }),
  uploadJobs: many(uploadJobs),
  comments: many(mediaComments),
}));

export const liveStreamsRelations = relations(liveStreams, ({ one }) => ({
  user: one(users, { fields: [liveStreams.userId], references: [users.id] }),
  recordingAsset: one(mediaAssets, { fields: [liveStreams.recordingAssetId], references: [mediaAssets.id] }),
}));
