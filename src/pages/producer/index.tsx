import { GetServerSideProps } from "next";
import { prisma } from "@/server/db";

type Producer = {
  id: number;
  name: string;
  location: string;
  website: string;
};

type ProducersProps = {
  producers: Producer[];
  notFound?: boolean;
};

// Main exported component for Producer page
export default function Producers({ producers }: ProducersProps) {
  return (
    <div>
      {producers.map((producer) => (
        <a key={producer.id} href={"/producer/" + String(producer.id)}>
          <p>{producer.name}</p>
        </a>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  ProducersProps
> = async () => {
  try {
    const producers = await prisma.producer.findMany();

    return {
      props: {
        producers: producers.map((producer) => ({
          id: producer.id,
          name: producer.name,
          location: producer.location,
          website: producer.website,
        })),
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};
