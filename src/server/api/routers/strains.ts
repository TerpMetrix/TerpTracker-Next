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
          shops: true,
        },
      });

      return { strain };
    }),

  getAllStrains: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.strain.findMany();
  }),
});
