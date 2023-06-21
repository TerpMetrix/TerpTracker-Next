import { GetServerSideProps } from "next";
import { Producer } from "@prisma/client";
import { prisma } from "@/server/db";

// The props this component receives from getServerSideProps
export type ProducerProps = {
  producer: Producer;
  notFound?: boolean;
};

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

// A type for this pages url params
type Params = {
  id: string;
};

// getServerSideProps only runs on the server.
// It will never run on the client.
// That means we can safely make calls to our database here.
// That data is then passed to the component as props.
export const getServerSideProps: GetServerSideProps<ProducerProps> = async (
  context
) => {
  const { id } = context.params as Params;
  const parsedId = parseInt(id as string, 10); // Parse id as an integer
  if (isNaN(parsedId)) {
    return {
      notFound: true,
    };
  }
  const producer = await prisma.producer.findUnique({
    where: {
      id: parsedId,
    },
  });

  if (!producer) {
    return {
      notFound: true,
    };
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
