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
  getStrainsByFilteredSearch: publicProcedure
    .input(
      z.object({
        search: z.string() || z.undefined(),
        terpTags: z.array(z.string()) || z.undefined(),
        productType: z.string() || z.undefined(),
        producer: z.string() || z.undefined(),
        //sort by
        popularity: z.boolean() || z.undefined(),
        age: z.boolean() || z.undefined(),
      })
    )
    .query(async ({ input, ctx }) => {
      const strains = await ctx.prisma.strain.findMany({
        where: {
          terpTags: {
            some: {
              name: {
                in: input.terpTags,
              },
            },
          },
          productType: {
            contains: input.productType,
          },
          producer: {
            name: {
              contains: input.producer,
            },
          },
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
      return { strains };
    }),
});
