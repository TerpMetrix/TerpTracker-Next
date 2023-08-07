import { prisma } from "@/server/database/db";
import type { Prisma, Producer } from "@prisma/client";

export type ProducerWithRelations = Prisma.ProducerGetPayload<{
  include: {
    Strains: {
      include: {
        TerpTags: true;
      };
    };
  };
}>;

/**
 * Retrieves a producer from the database by its ID, along with its related strains and tags.
 * @param {number} id - The ID of the producer to retrieve.
 * @returns {Promise<ProducerWithRelations | null>} A promise that resolves to the producer object with its related strains and tags, or null if no producer was found with the given ID.
 */
export async function getProducerById(
  id: number
): Promise<ProducerWithRelations | null> {
  const producer = await prisma.producer.findUnique({
    where: {
      id: id,
    },
    include: {
      Strains: {
        include: {
          TerpTags: true,
        },
      },
    },
  });

  return producer;
}

/**
 * Retrieves a list of featured producers from the database.
 * @returns {Promise<Array<Producer>>} A promise that resolves to an array of producer objects.
 */
export async function getFeaturedProducers(): Promise<Array<Producer>> {
  const producers = await prisma.producer.findMany({
    take: 10,
  });
  return producers;
}

// get all producers with relations
export async function getAllProducersWithRelations(): Promise<
  ProducerWithRelations[]
> {
  const producers = await prisma.producer.findMany({
    include: {
      Strains: {
        include: {
          TerpTags: true,
        },
      },
    },
  });
  return producers;
}
