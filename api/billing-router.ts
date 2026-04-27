/* ═══════════════════════════════════════════════════════════
   Billing Router — Tier Management + Cost Calculation
   25% markup on wholesale. Ad9x 20% of gross.
   "Let this big dog eat too."
   ═══════════════════════════════════════════════════════════ */

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { tierConfigs, usageRecords, users } from "../db/schema";
import { eq, and, sql, desc } from "drizzle-orm";

/* ── Tier Pricing Configuration ──
   
   BUSINESS MODEL:
   - Wholesale cost = what Ad9x pays JamDAVE™ / CDN / compute providers
   - Retail cost = wholesale × markupMultiplier (what user pays)
   - Ad9x fee = 20% of gross revenue
   - JamZia margin = retail - wholesale - Ad9x fee
   
   Custom tier: 25% markup (lowest margin, best value for power users)
   Entry tier: 3x markup (highest margin, basic users subsidize infrastructure)
*/

export const DEFAULT_TIERS = [
  {
    tier: "entry",
    displayName: "Entry",
    description: "Get started with JamZia. Basic upload, basic stream. Perfect for beginners exploring the platform.",
    storageBytes: 5 * 1024 * 1024 * 1024, /* 5GB */
    uploadMaxFileSize: 500 * 1024 * 1024, /* 500MB */
    uploadMaxDurationSeconds: 600, /* 10 min */
    streamMaxBitrateKbps: 2500,
    streamMaxDurationSeconds: 3600, /* 1 hour */
    streamSimultaneous: 1,
    streamMaxViewers: 100,
    abrEnabled: false,
    abrMaxResolutions: 1,
    monthlyPriceUsd: "9.99",
    yearlyPriceUsd: "99.99",
    wholesaleStoragePerGb: "0.023",
    wholesaleTransferPerGb: "0.09",
    wholesaleComputePerHour: "0.05",
    markupMultiplier: "3.00", /* 3x wholesale = 200% margin */
    features: ["5GB Storage", "500MB Uploads", "10min Videos", "1 Simul Stream", "100 Viewer Cap", "Basic Support"],
  },
  {
    tier: "pro",
    displayName: "Pro",
    description: "For creators ready to grow. More storage, longer streams, and adaptive bitrate for quality playback.",
    storageBytes: 50 * 1024 * 1024 * 1024, /* 50GB */
    uploadMaxFileSize: 2 * 1024 * 1024 * 1024, /* 2GB */
    uploadMaxDurationSeconds: 3600, /* 1 hour */
    streamMaxBitrateKbps: 6000,
    streamMaxDurationSeconds: 14400, /* 4 hours */
    streamSimultaneous: 2,
    streamMaxViewers: 1000,
    abrEnabled: true,
    abrMaxResolutions: 3, /* 360p, 720p, 1080p */
    monthlyPriceUsd: "29.99",
    yearlyPriceUsd: "299.99",
    wholesaleStoragePerGb: "0.023",
    wholesaleTransferPerGb: "0.09",
    wholesaleComputePerHour: "0.05",
    markupMultiplier: "2.50", /* 2.5x wholesale = 150% margin */
    features: ["50GB Storage", "2GB Uploads", "1hr Videos", "2 Simul Streams", "1K Viewer Cap", "ABR 3 Resolutions", "Priority Support"],
  },
  {
    tier: "master",
    displayName: "Master",
    description: "Professional-grade tools. High-bitrate streaming, 4K uploads, and monetization controls.",
    storageBytes: 250 * 1024 * 1024 * 1024, /* 250GB */
    uploadMaxFileSize: 10 * 1024 * 1024 * 1024, /* 10GB */
    uploadMaxDurationSeconds: 7200, /* 2 hours */
    streamMaxBitrateKbps: 12000,
    streamMaxDurationSeconds: 28800, /* 8 hours */
    streamSimultaneous: 3,
    streamMaxViewers: 10000,
    abrEnabled: true,
    abrMaxResolutions: 4, /* 360p, 720p, 1080p, 4K */
    monthlyPriceUsd: "79.99",
    yearlyPriceUsd: "799.99",
    wholesaleStoragePerGb: "0.023",
    wholesaleTransferPerGb: "0.09",
    wholesaleComputePerHour: "0.05",
    markupMultiplier: "2.00", /* 2x wholesale = 100% margin */
    features: ["250GB Storage", "10GB Uploads", "2hr Videos", "3 Simul Streams", "10K Viewer Cap", "ABR 4 Resolutions", "4K Uploads", "Monetization Tools"],
  },
  {
    tier: "prime",
    displayName: "Prime",
    description: "For serious broadcasters. Unlimited streams, massive storage, and enterprise-grade reliability.",
    storageBytes: 1024 * 1024 * 1024 * 1024, /* 1TB */
    uploadMaxFileSize: 50 * 1024 * 1024 * 1024, /* 50GB */
    uploadMaxDurationSeconds: 14400, /* 4 hours */
    streamMaxBitrateKbps: 25000,
    streamMaxDurationSeconds: 86400, /* 24 hours */
    streamSimultaneous: 5,
    streamMaxViewers: 100000,
    abrEnabled: true,
    abrMaxResolutions: 5, /* 360p, 720p, 1080p, 1440p, 4K */
    monthlyPriceUsd: "199.99",
    yearlyPriceUsd: "1999.99",
    wholesaleStoragePerGb: "0.023",
    wholesaleTransferPerGb: "0.09",
    wholesaleComputePerHour: "0.05",
    markupMultiplier: "1.75", /* 1.75x wholesale = 75% margin */
    features: ["1TB Storage", "50GB Uploads", "4hr Videos", "5 Simul Streams", "100K Viewer Cap", "ABR 5 Resolutions", "4K Uploads", "Analytics Dashboard", "API Access", "Dedicated Support"],
  },
  {
    tier: "network",
    displayName: "Network",
    description: "For media networks and multi-channel operators. White-label capabilities and custom CDN routing.",
    storageBytes: 5 * 1024 * 1024 * 1024 * 1024, /* 5TB */
    uploadMaxFileSize: 100 * 1024 * 1024 * 1024, /* 100GB */
    uploadMaxDurationSeconds: 28800, /* 8 hours */
    streamMaxBitrateKbps: 50000,
    streamMaxDurationSeconds: 172800, /* 48 hours */
    streamSimultaneous: 10,
    streamMaxViewers: 500000,
    abrEnabled: true,
    abrMaxResolutions: 6, /* All resolutions + HDR */
    monthlyPriceUsd: "499.99",
    yearlyPriceUsd: "4999.99",
    wholesaleStoragePerGb: "0.023",
    wholesaleTransferPerGb: "0.09",
    wholesaleComputePerHour: "0.05",
    markupMultiplier: "1.50", /* 1.5x wholesale = 50% margin */
    features: ["5TB Storage", "100GB Uploads", "8hr Videos", "10 Simul Streams", "500K Viewer Cap", "ABR 6 Resolutions", "HDR Support", "White Label", "Custom CDN", "SLA 99.99%", "Account Manager"],
  },
  {
    tier: "custom",
    displayName: "Custom",
    description: "Wholesale-rate infrastructure for enterprise. You pay what we pay + 25%. The best rate for adaptive bitrate at scale.",
    storageBytes: 1099511627776, /* 1 PB (effectively unlimited) */
    uploadMaxFileSize: 1099511627776, /* Effectively unlimited */
    uploadMaxDurationSeconds: 86400, /* 24 hours */
    streamMaxBitrateKbps: 100000,
    streamMaxDurationSeconds: 604800, /* 7 days */
    streamSimultaneous: 50,
    streamMaxViewers: 2000000,
    abrEnabled: true,
    abrMaxResolutions: 10, /* Every resolution including 8K */
    monthlyPriceUsd: "999.99",
    yearlyPriceUsd: "9999.99",
    wholesaleStoragePerGb: "0.023",
    wholesaleTransferPerGb: "0.09",
    wholesaleComputePerHour: "0.05",
    markupMultiplier: "1.25", /* 1.25x wholesale = 25% markup = BEST RATE */
    features: ["Unlimited Storage", "Unlimited Upload Size", "24hr Videos", "50 Simul Streams", "2M Viewer Cap", "All Resolutions + 8K", "HDR + Dolby Vision", "Custom Storage Endpoint", "Dedicated Cluster", "SLA 99.999%", "24/7 Support", "Custom Contracts"],
  },
];

export const billingRouter = createRouter({
  /* ── Seed tier configs (admin only, runs once) ── */
  seedTiers: adminQuery
    .mutation(async () => {
      const db = getDb();
      for (const tier of DEFAULT_TIERS) {
        await db.insert(tierConfigs).values(tier).onDuplicateKeyUpdate({
          set: tier,
        });
      }
      return { seeded: DEFAULT_TIERS.length };
    }),

  /* ── Get all tier configs (public) ── */
  tiers: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(tierConfigs).where(eq(tierConfigs.isActive, true));
  }),

  /* ── Get user's current tier ── */
  myTier: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const [user] = await db.select().from(users).where(eq(users.id, ctx.user.id));
    if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    
    const [tier] = await db.select().from(tierConfigs).where(eq(tierConfigs.tier, user.tier));
    return { userTier: user.tier, tierConfig: tier || null };
  }),

  /* ── Upgrade/downgrade tier ── */
  setTier: authedQuery
    .input(z.object({ tier: z.enum(["entry", "pro", "master", "prime", "network", "custom"]) }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.update(users)
        .set({ tier: input.tier, tierExpiresAt: sql`DATE_ADD(NOW(), INTERVAL 1 MONTH)` })
        .where(eq(users.id, ctx.user.id));
      return { success: true, newTier: input.tier };
    }),

  /* ── Calculate cost for usage ── */
  calculateCost: publicQuery
    .input(z.object({
      tier: z.enum(["entry", "pro", "master", "prime", "network", "custom"]),
      storageGb: z.number().min(0),
      transferGb: z.number().min(0),
      computeHours: z.number().min(0),
    }))
    .query(async ({ input }) => {
      const db = getDb();
      const [tier] = await db.select().from(tierConfigs).where(eq(tierConfigs.tier, input.tier));
      if (!tier) throw new TRPCError({ code: "NOT_FOUND", message: "Tier not found" });
      
      const markup = parseFloat(tier.markupMultiplier?.toString() || "1.25");
      const storageCost = input.storageGb * parseFloat(tier.wholesaleStoragePerGb?.toString() || "0.023");
      const transferCost = input.transferGb * parseFloat(tier.wholesaleTransferPerGb?.toString() || "0.09");
      const computeCost = input.computeHours * parseFloat(tier.wholesaleComputePerHour?.toString() || "0.05");
      
      const wholesaleTotal = storageCost + transferCost + computeCost;
      const retailTotal = wholesaleTotal * markup;
      const ad9xFee = retailTotal * 0.20; /* 20% of gross */
      const jamziaMargin = retailTotal - wholesaleTotal - ad9xFee;
      
      return {
        tier: input.tier,
        storageGb: input.storageGb,
        transferGb: input.transferGb,
        computeHours: input.computeHours,
        wholesaleTotal: wholesaleTotal.toFixed(4),
        markupMultiplier: markup.toFixed(2),
        retailTotal: retailTotal.toFixed(4),
        ad9xFeePercent: "20%",
        ad9xFee: ad9xFee.toFixed(4),
        jamziaMargin: jamziaMargin.toFixed(4),
        breakdown: {
          storage: { wholesale: storageCost.toFixed(4), retail: (storageCost * markup).toFixed(4) },
          transfer: { wholesale: transferCost.toFixed(4), retail: (transferCost * markup).toFixed(4) },
          compute: { wholesale: computeCost.toFixed(4), retail: (computeCost * markup).toFixed(4) },
        },
        message: `Custom tier gives you the best rate at ${(markup - 1) * 100}% markup. Entry tier covers infrastructure costs with ${((markup - 1) * 100).toFixed(0)}% margin.`,
      };
    }),

  /* ── Record usage (called by background jobs) ── */
  recordUsage: authedQuery
    .input(z.object({
      recordType: z.enum(["storage", "transfer", "compute", "streaming", "api_call"]),
      bytesUsed: z.number().optional(),
      secondsUsed: z.number().optional(),
      requestsCount: z.number().optional(),
      mediaAssetId: z.number().optional(),
      liveStreamId: z.number().optional(),
      region: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [user] = await db.select().from(users).where(eq(users.id, ctx.user.id));
      const [tier] = await db.select().from(tierConfigs).where(eq(tierConfigs.tier, user?.tier || "entry"));
      
      const markup = parseFloat(tier?.markupMultiplier?.toString() || "1.25");
      const storageRate = parseFloat(tier?.wholesaleStoragePerGb?.toString() || "0.023");
      const transferRate = parseFloat(tier?.wholesaleTransferPerGb?.toString() || "0.09");
      const computeRate = parseFloat(tier?.wholesaleComputePerHour?.toString() || "0.05");
      
      let wholesaleCost = 0;
      if (input.bytesUsed) {
        const gb = input.bytesUsed / (1024 * 1024 * 1024);
        if (input.recordType === "storage") wholesaleCost = gb * storageRate;
        if (input.recordType === "transfer") wholesaleCost = gb * transferRate;
      }
      if (input.secondsUsed && input.recordType === "compute") {
        wholesaleCost = (input.secondsUsed / 3600) * computeRate;
      }
      if (input.secondsUsed && input.recordType === "streaming") {
        wholesaleCost = (input.secondsUsed / 3600) * computeRate * 2; /* Streaming uses more compute */
      }
      
      const retailCost = wholesaleCost * markup;
      const ad9xFee = retailCost * 0.20;
      const jamziaMargin = retailCost - wholesaleCost - ad9xFee;
      
      await db.insert(usageRecords).values({
        userId: ctx.user.id,
        tierId: tier?.id,
        recordType: input.recordType,
        bytesUsed: input.bytesUsed,
        secondsUsed: input.secondsUsed,
        requestsCount: input.requestsCount,
        wholesaleCost: wholesaleCost.toFixed(8),
        retailCost: retailCost.toFixed(8),
        ad9xFeeAmount: ad9xFee.toFixed(8),
        jamziaMargin: jamziaMargin.toFixed(8),
        mediaAssetId: input.mediaAssetId,
        liveStreamId: input.liveStreamId,
        region: input.region,
        periodStart: new Date(),
        periodEnd: new Date(),
      });
      
      return { recorded: true, wholesaleCost, retailCost, ad9xFee, jamziaMargin };
    }),

  /* ── Get user's usage summary ── */
  usageSummary: authedQuery
    .input(z.object({
      periodDays: z.number().min(1).max(365).default(30),
    }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const records = await db.select()
        .from(usageRecords)
        .where(and(
          eq(usageRecords.userId, ctx.user.id),
          sql`${usageRecords.createdAt} > DATE_SUB(NOW(), INTERVAL ${input.periodDays} DAY)`,
        ));
      
      const totals = records.reduce((acc, r) => {
        const type = r.recordType;
        acc[type] = (acc[type] || 0) + parseFloat(r.retailCost?.toString() || "0");
        return acc;
      }, {} as Record<string, number>);
      
      const totalRetail = Object.values(totals).reduce((a, b) => a + b, 0);
      const totalWholesale = records.reduce((a, r) => a + parseFloat(r.wholesaleCost?.toString() || "0"), 0);
      const totalAd9xFee = records.reduce((a, r) => a + parseFloat(r.ad9xFeeAmount?.toString() || "0"), 0);
      
      return {
        periodDays: input.periodDays,
        totalRecords: records.length,
        byType: totals,
        totalRetail: totalRetail.toFixed(4),
        totalWholesale: totalWholesale.toFixed(4),
        totalAd9xFee: totalAd9xFee.toFixed(4),
        jamziaKept: (totalRetail - totalWholesale - totalAd9xFee).toFixed(4),
      };
    }),
});
