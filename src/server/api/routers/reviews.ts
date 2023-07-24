import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const reviewRouter = createTRPCRouter({
  newReview: publicProcedure
    .input(
      z.object({
        strainId: z.number(),
        rating: z.number().max(5).min(1),
        comment: z.string().max(500),
        profileName: z.string(),
        tagId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        // Need to find this tosId to connect to review
        // const tosId = await ctx.prisma.tagOnStrain.findUnique({
        //   where: {
        //     id: newTerpTag.id, ???
        //   },
        // });

        console.log("input: ", input);

        //update strain to include new tags and create new review
        const newTagOnStrain = await ctx.prisma.strain.update({
          where: {
            id: input.strainId,
          },
          data: {
            TerpTags: {
              connect: { id: input.tagId },
            },
          },
        });
        const newReview = await ctx.prisma.review.create({
          data: {
            rating: input.rating,
            comment: input.comment,
            Strain: {
              connect: { id: input.strainId },
            },
            Profile: {
              connect: { profileName: input.profileName },
            },
          },
        });
        console.log("created new review: ", newReview);
        console.log("updated strain: ", newTagOnStrain);
      } catch (e) {
        console.error(e);
      }
    }),
});
