import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const strainRouter = createTRPCRouter({
  getStrain: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const strain = await ctx.prisma.strain.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Reviews: {
            include: {
              TerpTag: true,
            },
          },
          TerpTags: true,
          Producer: true,
        },
      });

      return { strain };
    }),

  getAllStrains: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.strain.findMany();
  }),
});
