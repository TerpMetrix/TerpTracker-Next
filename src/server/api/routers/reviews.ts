import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  newReview: publicProcedure
    .input(
      z.object({
        strainId: z.number(),
        rating: z.number().max(5).min(1),
        comment: z.string().max(500),
        profileId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const newReview = await ctx.prisma.review.create({
          data: {
            rating: input.rating,
            comment: input.comment,
            strain: {
              connect: { id: input.strainId },
            },
            Profile: {
              connect: { userId: input.profileId },
            },
          },
        });
        console.log("created new review: ", newReview);
      } catch (e) {
        console.error(e);
      }
    }),
});
