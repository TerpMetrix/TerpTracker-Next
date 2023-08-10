import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { error } from "console";

export const reviewRouter = createTRPCRouter({
  newReview: protectedProcedure
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

        console.log("input: ", input);

        //update strain to include new tags and create new review
        //udpate only if tag exists
        if (input.tagId) {
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
          console.log("updated strain: ", newTagOnStrain);

          const newReviewWithTag = await ctx.prisma.review.create({
            data: {
              rating: input.rating,
              comment: input.comment,
              Strain: {
                connect: { id: input.strainId },
              },
              Profile: {
                connect: { profileName: input.profileName },
              },
              TerpTag: {
                connect: { id: input.tagId },
              },
            },
          });
          console.log("created new review with tag: ", newReviewWithTag);
        }
        else {
          const newReviewWithoutTag = await ctx.prisma.review.create({
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
          console.log("created new review without tag: ", newReviewWithoutTag);
        }
      } catch (e) {
        return error(e);
      }
    }),
});
