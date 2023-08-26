import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { error } from "console";

export const profileRouter = createTRPCRouter({

    editProfile: protectedProcedure
        .input(
            z.object({
                originalName: z.string(),
                updatedName: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                console.log("input: ", input);

                const updatedProfile = await ctx.prisma.profile.update({
                    where: {
                        profileName: input.originalName,
                    },
                    data: {
                        profileName: input.updatedName,
                    },
                });

                console.log("updated profile: ", updatedProfile);

                const updatedUser = await ctx.prisma.user.update({
                    where: {
                        name: input.originalName,
                    },
                    data: {
                        name: input.updatedName,
                    },
                });

                console.log("updated user: ", updatedUser);

            } catch (e) {
                return error(e);
            }
        }),
});