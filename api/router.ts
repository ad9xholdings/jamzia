import { authRouter } from "./auth-router";
import { mediaRouter } from "./media-router";
import { uploadRouter } from "./upload-router";
import { streamRouter } from "./stream-router";
import { billingRouter } from "./billing-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  media: mediaRouter,
  upload: uploadRouter,
  stream: streamRouter,
  billing: billingRouter,
});

export type AppRouter = typeof appRouter;
