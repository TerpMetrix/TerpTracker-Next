import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { strainRouter } from "./routers/strains";
import { reviewRouter } from "./routers/reviews";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  strains: strainRouter,
  reviews: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
