import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  // This is a public query, meaning it can be accessed by anyone.
  // It queries the database for a single example by name.
  getExample: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      try {
        const example = ctx.prisma.example.findFirst({
          where: {
            name: input.name,
          },
        });

        return example;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }),

  // This is a public query, meaning it can be accessed by anyone.
  // It just gets all of the examples in the database.
  getAllExamples: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  // This is a protected query, meaning it can only be accessed by logged in users.
  getProtectedData: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
