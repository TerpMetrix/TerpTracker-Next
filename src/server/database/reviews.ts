import { prisma } from "@/server/database/db";
import type { Prisma } from "@prisma/client";


export type ReviewWithRelations = Prisma.ReviewGetPayload<{
  include: {
    Profile: { 
      include: {
        User: true;
      };
    };
    Strain: true;
    TerpTags: true;
  };
}>;

/**
 * Retrieves a review by its ID, including its associated profile and strain.
 * @param id The ID of the review to retrieve.
 * @returns A Promise that resolves to the review with its associated profile and strain, or null if no review was found.
 */
export async function getReviewById(
  id: number
): Promise<ReviewWithRelations | null> {
  const review = await prisma.review.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Profile: {
        include: {
          User: true,
        },
      },
      Strain: true,
      TerpTags: true,
    },
  });

  return review;
}
