import { prisma } from "@/server/database/db";

export async function getProducerById(id: number) {
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
