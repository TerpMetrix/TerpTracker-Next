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

                // This line is where the error is thrown if we dont have the unique constraint. 
                // We could probably avoid this error by seraching for the user by id instead of name
                // However, the next-auth session variable returns a user, not a profile
                // The user.name is what we need for proper page routing (/profile/:user.name vs /profile/:user.id)
                // If we cant guarantee the user.name field matches the profile.profileName, these routes will break or we will have to use user.id to get the profile (seems expensive)
                // I do think a future with no profile table makes more sense to me, less updating and less data to store
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