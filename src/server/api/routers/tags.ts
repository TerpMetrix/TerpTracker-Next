import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const tagRouter = createTRPCRouter({
  getTag: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const tag = await ctx.prisma.terpTag.findUnique({
        where: {
          id: input.id,
        },
      });

      return { tag };
    }),

  getAllTags: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.terpTag.findMany();
  }),
});
