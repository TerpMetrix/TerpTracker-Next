import { prisma } from "@/server/database/db";

export async function getProducerById(id: number) {
  const producer = await prisma.producer.findUnique({
    where: {
      id: id,
    },
    include: {
      strains: {
        select: {
          image: true,
          id: true,
          name: true,
          batchDate: true,
          THC: true,
          productType: true,
          producerId: true,
          producer: {
            select: {
              name: true,
            },
          },
          tags: {
            select: {
              weight: true,
              tag: {
                select: {
                  id: true,
                  color: true,
                  lean: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return producer;
}
