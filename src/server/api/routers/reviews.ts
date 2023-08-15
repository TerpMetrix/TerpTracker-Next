import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { error } from "console";

export const reviewRouter = createTRPCRouter({
  newReview: protectedProcedure
    .input(
      z.object({
        strainId: z.number(),
        comment: z.string().max(500),
        profileName: z.string(),
        tagIds: z.array(z.number()),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        console.log("input: ", input);

        //update strain to include new tags and create new review
        //udpate only if tag exists
        if (input.tagIds) {
          const newTagOnStrain = await ctx.prisma.strain.update({
            where: {
              id: input.strainId,
            },
            data: {
              TerpTags: {
                connect: input.tagIds.map((tagId) => ({ id: tagId })),
              },
            },
          });
          console.log("updated strain: ", newTagOnStrain);

          const newReviewWithTag = await ctx.prisma.review.create({
            data: {
              comment: input.comment,
              Strain: {
                connect: { id: input.strainId },
              },
              Profile: {
                connect: { profileName: input.profileName },
              },
              TerpTags: {
                connect: input.tagIds.map((tagId) => ({ id: tagId })),
              },
            },
          });
          console.log("created new review with tag: ", newReviewWithTag);
        }
        else {
          const newReviewWithoutTag = await ctx.prisma.review.create({
            data: {
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
