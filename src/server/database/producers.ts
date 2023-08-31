import { prisma } from "@/server/database/db";
import type { Prisma, Producer } from "@prisma/client";

export type ProducerWithRelations = Prisma.ProducerGetPayload<{
  include: {
    strains: {
      include: {
        terpTags: true;
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
      strains: {
        include: {
          terpTags: true,
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
      strains: {
        include: {
          terpTags: true,
        },
      },
    },
  });
  return producers;
}

// get producers and order the output by the sum of all strains.votes (input either asc or desc and limit)

export async function getProducersByVotes(
  order: "asc" | "desc",
  limit: number
): Promise<ProducerWithRelations[]> {
  const producers = await prisma.producer.findMany({
    include: {
      strains: {
        include: {
          terpTags: true,
        },
      },
    },
    take: limit,
  });

  //reorder producers after by sum of votes

  producers.sort((a, b) => {
    let aVotes = 0;
    let bVotes = 0;
    a.strains.forEach((strain) => {
      aVotes += strain.votes;
    });
    b.strains.forEach((strain) => {
      bVotes += strain.votes;
    });
    if (order === "asc") {
      return aVotes - bVotes;
    } else {
      return bVotes - aVotes;
    }
  });

  return producers;
}
