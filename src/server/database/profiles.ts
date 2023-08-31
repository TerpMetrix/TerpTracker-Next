import { prisma } from "@/server/database/db";
import type { Prisma } from "@prisma/client";
import { type TagWithNoRelations } from "@/server/database/tags";

export type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    user: true;
    reviews: {
      include: {
        strain: true;
        terpTags: true;
        profile: {
          include: {
            user: true;
          };
        };
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
    };
  };
}>;

export type Profile = Prisma.ProfileGetPayload<{
  include: {
    user: true;
  };
}>;

export async function getProfileFavTerps(
  profileName: string
): Promise<TagWithNoRelations[] | null> {
  const profile = await prisma.profile.findUnique({
    where: {
      profileName: profileName,
    },
    include: {
      upvotedStrains: {
        include: {
          terpTags: true,
        },
      },
    },
  });

  if (!profile) {
    return null;
  } else {
    const favTerps = profile.upvotedStrains.map((strain) => {
      return strain.terpTags;
    });

    //resructure favTerps array
    const newTerps = favTerps.flat();

    return newTerps;
  }
}

export async function getProfileByName(
  profileName: string
): Promise<ProfileWithRelations | null> {
  // console.log("profileName: ", profileName);
  const profile = await prisma.profile.findUnique({
    where: {
      profileName: profileName,
    },
    include: {
      user: true,
      reviews: {
        include: {
          strain: true,
          terpTags: true,
          profile: {
            include: {
              user: true,
            },
          },
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
      },
    },
  });

  // console.log("profile: ", profile);

  return profile;
}
