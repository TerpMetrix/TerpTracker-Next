import type { GetServerSideProps } from "next";
import type { Producer } from "@prisma/client";
import { prisma } from "@/server/db";

// The props this component receives from getServerSideProps
export type ProducerProps = {
  producer: Producer;
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Producer({ producer }: ProducerProps) {
  return (
    <div>
      <p>{producer.id}</p>
      <p>{producer.location}</p>
      <p>{producer.website}</p>
      <p>{producer.name}</p>
    </div>
  );
}

// getServerSideProps only runs on the server. never on the client.
// We can make calls to our database directly here.
// That data is then passed to the component as props.
export const getServerSideProps: GetServerSideProps<ProducerProps> = async (
  context
) => {
  const producer = await prisma.producer.findUnique({
    where: {
      id: Number(context.params?.id) || -1,
    },
  });

  if (!producer) {
    return { notFound: true };
  }

  return {
    props: {
      producer: {
        id: producer.id,
        location: producer.location,
        name: producer.name,
        website: producer.website,
      },
    },
  };
};
