import { prisma } from "@/server/database/db";
import { Producer } from "@prisma/client";

/**
 * Retrieves a producer from the database by ID, including all associated strains and tags.
 * @param {number} id - The ID of the producer to retrieve.
 * @returns {Promise<Producer | null>} A promise that resolves to the producer object, or null if not found.
 */
export async function getProducerById(id: number): Promise<Producer | null> {
  const producer = await prisma.producer.findUnique({
    where: {
      id: id,
    },
    include: {
      strains: {
        include: {
          tags: {
            include: {
              tag: true,
            },
          },
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
