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
  getStrainsByFilteredSearch: publicProcedure
    .input(
      z.object({
        search: z.string() || z.undefined(),
        terpTags: z.array(z.string()),
        productType: z.string(),
        producer: z.string(),
        //sort by
        popularity: z.boolean(),
        age: z.boolean(),
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
        },
      });
      return { strains };
    }),
});
