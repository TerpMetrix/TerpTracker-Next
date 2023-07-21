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
        tagId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const newTerpTag = await ctx.prisma.tagOnStrain.create({
          data: {
            assignedBy: "user", //placeholder
            strain: {
              connect: { id: input.strainId },
            },
            tag: {
              connect: { id: input.tagId },
            },
          },
        });
        // Need to find this tosId to connect to review
        // const tosId = await ctx.prisma.tagOnStrain.findUnique({
        //   where: {
        //     id: newTerpTag.id, ???
        //   },
        // });
        const newReview = await ctx.prisma.review.create({
          data: {
            rating: input.rating,
            comment: input.comment,
            Strain: {
              connect: { id: input.strainId },
            },
            Profile: {
              connect: { userId: input.profileId },
            },
            TagOnStrain: {
              connect: { tosId: input.tagId },
            },
          },
        });
        console.log("created new review: ", newReview);
      } catch (e) {
        console.error(e);
      }
    }),
});
