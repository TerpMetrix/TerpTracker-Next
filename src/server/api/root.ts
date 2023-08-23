import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { strainRouter } from "./routers/strains";
import { reviewRouter } from "./routers/reviews";
import { tagRouter } from "./routers/tags";
import { voteRouter } from "./routers/votes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  strains: strainRouter,
  reviews: reviewRouter,
  votes: voteRouter,
  tags: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
