import type { GetServerSideProps } from "next";

import { prisma } from "@/server/db";
import Hero from "@/components/hero";

type Producer = {
  id: number;
  name: string;
  location: string;
  website: string;
  strains: Strain[];
};
type Strain = {
  id: number;
  name: string;
  batchDate: string;
};

// The props this component receives from getServerSideProps
export type ProducerProps = {
  producer: Producer;
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Producer({ producer }: ProducerProps) {
  return (
    <div>
      <Hero
        title={producer.name}
        description="Generic default description of this producer. Should add a database column for an about."
        link={producer.website}
        tag="#strains"
      />
      <div className="h-screen">aa</div>
      <div className="h-screen">a</div>
      <div className="h-screen"></div>
      <ul id="#strains">
        {producer.strains.map((strain) => {
          return (
            <li key={strain.id}>
              <a href={"/strain/" + String(strain.id)}>
                {strain.name} - {strain.batchDate}
              </a>
            </li>
          );
        })}
      </ul>
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
    include: {
      strains: true,
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
        strains: producer.strains.map((strain) => ({
          id: strain.id,
          name: strain.name,
          batchDate: strain.batchDate.toDateString(),
        })),
      },
    },
  };
};
