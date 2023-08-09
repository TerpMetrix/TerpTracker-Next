import { prisma } from "@/server/database/db";
import { Prisma } from "@prisma/client";

/**
 * The StrainWithRelations type represents a strain with its related data, including reviews, tags, and producer.
 */
export type StrainWithRelations = Prisma.StrainGetPayload<{
  include: {
    Reviews: {
      include: {
        Profile: {
          include: {
            User: true;
          };
        }
        TerpTag: true,
        terpTagId: true,
        Strain: true,
      }
    },
    TerpTags: true,
    Producer: true;
  };
}>;


/**
 * Retrieves a strain by its ID, including its related reviews, tags, and producer.
 * @param id The ID of the strain to retrieve.
 * @returns A Promise that resolves to the retrieved strain with its related data, or null if no strain was found with the given ID.
 */
export async function getStrainById(
  id: number
): Promise<StrainWithRelations | null> {
  const strain = await prisma.strain.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Reviews: {
        include: {
          Profile: {
            include: {
              User: true,
            },
          },
          TerpTag: true,
          Strain: true,
        }
      },
      TerpTags: true,
      Producer: true,
    },
  });

  return strain;
}

/**
 * Retrieves all strains, including their related reviews, tags, and producer.
 * @returns A Promise that resolves to an array of all strains with their related data.
 */
export async function getAllStrainsWithRelations(): Promise<
  StrainWithRelations[]
> {
  const strains = await prisma.strain.findMany({
    include: {
      Reviews: {
        include: {
          Profile: {
            include: {
              User: true,
            },
          },
          TerpTag: true,
          Strain: true,
        }
      },
      TerpTags: true,
      Producer: true,
    },
  });
  return strains;
}

/**
 * Retrieves all featured strains, including their related producer and tags.
 * @returns A Promise that resolves to an array of all featured strains with their related data.
 */

//* Gets all strains from one producer by id

export async function getStrainsByProducerId(
  producerId: number
): Promise<StrainWithRelations[]> {
  const strains = await prisma.strain.findMany({
    where: {
      producerId: producerId,
    },
    include: {
      TerpTags: true,
      Producer: true,
      Reviews: {
        include: {
          Profile: {
            include: {
              User: true,
            }
          },
          TerpTag: true,
          Strain: true,
        },
      },
    },
  });
  return strains;
}


// Function to get strains by search term 

export async function getStrainsBySearchTerm(
  searchTerm: string
): Promise<StrainWithRelations[]> {
  const strains = await prisma.strain.findMany({
    where: {
      name: {
        contains: searchTerm,
      },
    },
    include: {
      TerpTags: true,
      Producer: true,
      Reviews: {
        include: {
          Profile: {
            include: {
              User: true,
            }
          },
          TerpTag: true,
          Strain: true,
        },
      },
    },
  });
  return strains;
}