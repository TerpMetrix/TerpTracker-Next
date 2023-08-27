import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "@/server/api/trpc";
import { error } from "console";

export const voteRouter = createTRPCRouter({
    checkIfVoted: publicProcedure
        .input(
            z.object({
                strainId: z.number(),
                profileName: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            // check if profile has voted on this strain
            const voted = await ctx.prisma.strainVote.findFirst({
                where: {
                    strainId: input.strainId,
                    profileName: input.profileName,
                },
            });
            console.log("voted: ", voted);
            return voted;
        }),
    newVote: protectedProcedure
        .input(
            z.object({
                strainId: z.number(),
                profileName: z.string(),
                vote: z.number(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                // add item to vote table to include new vote{
                if (input.profileName) {
                    const newVote = await ctx.prisma.strainVote.create({
                        data: {
                            value: input.vote,
                            strainId: input.strainId,
                            profileName: input.profileName,
                        },
                    });

                    console.log("new vote: ", newVote);

                    // get all votes for this strain
                    const allVotes = await ctx.prisma.strainVote.findMany({
                        where: {
                            strainId: input.strainId,
                        },
                    });

                    //update strain with sum
                    //sum votes from allvotes
                    const voteCount = allVotes.reduce((acc, vote) => {
                        return acc + vote.value;
                    }, 0);


                    const updatedStrain = await ctx.prisma.strain.update({
                        where: {
                            id: input.strainId,
                        },
                        data: {
                            votes: voteCount,
                        },
                    });


                    console.log("updated strain: ", updatedStrain);

                    //update profile with upvoted strain if upvote
                    if (input.vote === 1) {
                        const updatedProfile = await ctx.prisma.profile.update({
                            where: {
                                profileName: input.profileName,
                            },
                            data: {
                                upvotedStrains: {
                                    connect: {
                                        id: input.strainId,
                                    },
                                },
                            },
                        });

                        console.log("updated profile: ", updatedProfile);
                    }
                }
                else {
                    throw new Error("No profile name provided");
                }
            }
            catch (e) {
                return error(e);
            }
        }),

    updateVote: protectedProcedure
        .input(
            z.object({
                strainId: z.number(),
                profileName: z.string(),
                vote: z.number(),
            })
        )
        .mutation(async ({ input, ctx }) => {

            const updatedVote = await ctx.prisma.strainVote.update({
                where: {
                    strainId_profileName: {
                        strainId: input.strainId,
                        profileName: input.profileName,
                    },
                },
                data: {
                    value: input.vote,
                },
            });

            console.log("updated vote: ", updatedVote);

            //update strain vote count

            // get all votes for this strain
            const allVotes = await ctx.prisma.strainVote.findMany({
                where: {
                    strainId: input.strainId,
                },
            });

            //update strain with sum
            //sum votes from allvotes
            const voteCount = allVotes.reduce((acc, vote) => {
                return acc + vote.value;
            }, 0);


            const updatedStrain = await ctx.prisma.strain.update({
                where: {
                    id: input.strainId,
                },
                data: {
                    votes: voteCount,
                },
            });

            console.log("updated strain: ", updatedStrain);

            //update profile with upvoted strain if upvote
            if (input.vote === 1) {
                const updatedProfile = await ctx.prisma.profile.update({
                    where: {
                        profileName: input.profileName,
                    },
                    data: {
                        upvotedStrains: {
                            connect: {
                                id: input.strainId,
                            },
                        },
                    },
                });
                console.log("updated profile: ", updatedProfile);
            }
            else if (input.vote === -1) {
                const updatedProfile = await ctx.prisma.profile.update({
                    where: {
                        profileName: input.profileName,
                    },
                    data: {
                        upvotedStrains: {
                            disconnect: {
                                id: input.strainId,
                            },
                        },
                    },
                });
                console.log("updated profile: ", updatedProfile);
            }
            return voteCount;
        }),

    deleteVote: protectedProcedure
        .input(
            z.object({
                strainId: z.number(),
                profileName: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const deletedVote = await ctx.prisma.strainVote.delete({
                    where: {
                        strainId_profileName: {
                            strainId: input.strainId,
                            profileName: input.profileName,
                        },
                    },
                });

                console.log("deleted vote: ", deletedVote);

                //update strain vote count

                // get all votes for this strain
                const allVotes = await ctx.prisma.strainVote.findMany({
                    where: {
                        strainId: input.strainId,
                    },
                });

                //update strain with sum
                //sum votes from allvotes
                const voteCount = allVotes.reduce((acc, vote) => {
                    return acc + vote.value;
                }, 0);


                const updatedStrain = await ctx.prisma.strain.update({
                    where: {
                        id: input.strainId,
                    },
                    data: {
                        votes: voteCount,
                    },
                });

                console.log("updated strain: ", updatedStrain);

                //update profile and remove strain if previously upvote
                const updatedProfile = await ctx.prisma.profile.update({
                    where: {
                        profileName: input.profileName,
                    },
                    data: {
                        upvotedStrains: {
                            disconnect: {
                                id: input.strainId,
                            },
                        },
                    },
                });

                console.log("updated profile: ", updatedProfile);


            }
            catch (e) {
                return error(e);
            }
        }),


});




