import { prisma } from "@/server/database/db";
import type { Prisma } from "@prisma/client";

export type ProfileWithRelations = Prisma.ProfileGetPayload<{
    include: {
        user: true;
        reviews: {
            include: {
                strain: true;
            };
        };
        upvotedStrains: {
            include: {
                reviews: {
                    include: {
                        profile: {
                            include: {
                                user: true;
                            };
                        };
                        terpTags: true;
                        strain: true;
                    };
                };
                terpTags: true;
                producer: true;
            };
        }
    };
}>;

export type Profile = Prisma.ProfileGetPayload<{
    include: {
        user: true;
    };
}>;

export async function getProfileByName(
    profileName: string
): Promise<ProfileWithRelations | null> {

    console.log("profileName: ", profileName);
    const profile = await prisma.profile.findUnique({
        where: {
            profileName: profileName,
        },
        include: {
            user: true,
            reviews: {
                include: {
                    strain: true,
                },
            },
            upvotedStrains: {
                include: {
                    reviews: {
                        include: {
                            profile: {
                                include: {
                                    user: true,
                                },
                            },

                        },
                    },
                    terpTags: true,
                    producer: true,
                },
            }
        },
    });

    console.log("profile: ", profile);

    return profile;
}

