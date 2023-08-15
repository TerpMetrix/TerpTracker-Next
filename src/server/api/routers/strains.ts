import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
// import { error } from "console";

export const strainRouter = createTRPCRouter({
  getStrain: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const strain = await ctx.prisma.strain.findUnique({
        where: {
          id: input.id,
        },
        include: {
          reviews: {
            include: {
              terpTags: true,
            },
          },
          terpTags: true,
          producer: true,
        },
      });

      return { strain };
    }),

  getAllStrains: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.strain.findMany();
  }),

  // updateStrainVotes: publicProcedure
  //   .input(
  //     z.object({
  //       id: z.number(),
  //       vote: z.number().max(2).min(1),
  //     })
  //   )
  //   .mutation(async ({ input, ctx }) => {

  //     if (input.vote === 1) {
        // handle upvote

        // try {
        //   await ctx.prisma.strain.update({
        //     where: {
        //       id: input.id,
        //     },
        //     data: {
        //       vote: {
        //         increment: 1,
        //       },
        //     },
        //   });
        // }
        // catch (e) {
        //   error(e)
        // }
      // }
      // else if (input.vote === 2) {
       // handle downvote

        // try {
        //   await ctx.prisma.strain.update({
        //     where: {
        //       id: input.id,
        //     },
        //     data: {
        //       vote: {
        //         decrement: 1,
        //       },
        //     },
        //   });
        // }
        // catch (e) {
        //   return error(e)
        // }
    //   }
    // }
    // ),

});