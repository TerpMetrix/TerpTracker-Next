import type { GetServerSideProps } from "next";
import Link from "next/link";
import { prisma } from "@/server/db";
import Hero from "@/components/hero";
import Head from "next/head";
import Tag from "@/components/tag";

// The props this component receives from getServerSideProps
export type ProducerProps = {
  producer: Producer;
  notFound?: boolean;
};
type Producer = {
  id: number;
  name: string;
  location: string;
  website: string;
  strains: Strain[];
};

export type Strain = {
  id: number;
  name: string;
  batchDate: string;
  THC: number;
  productType: string;
  producerId: number;
  producerName: string;
  tags: Tags[];
};

export type Tags = {
  weight: number;
  color: string;
  lean: number;
  name: string;
};

// The main producer component exported in this file
export default function Producer({ producer }: ProducerProps) {
  return (
    <>
      <Head>
        <title>{producer.name} | TerpTracker</title>
      </Head>
      <div className="mb-4 flex flex-col items-center">
        <Hero
          title={producer.name}
          description="Generic default description of this producer. Should add a database column for an about."
          link={producer.website}
          tag="#strains"
        />
        <div className="flex w-full justify-center">
          <ul
            id="#strains"
            className="flex flex-wrap items-center justify-center gap-5"
          >
            {producer.strains.map((strain) => {
              return <StrainItem key={strain.id} strain={strain}></StrainItem>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

function StrainItem({ strain }: { strain: Strain }) {
  return (
    <Link href={"/strain/" + String(strain.id)}>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body">
          <h2 className="card-title">{strain.name}</h2>
          <div className="flex">

          <div className="flex flex-row gap-4 my-2">
          {strain.tags.map((tag) => {
            return <Tag tag={tag} />;
          })}
          </div>

          </div>
          <div className="text-gray-40 mb-3">{strain.batchDate}</div>
          <button className="btn w-20 bg-green-500 text-white border-0 hover:bg-green-600">10 💬</button>
        </div>
      </div>
    </Link>
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
      strains: {
        select: {
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
                  color: true,
                  lean: true,
                  name: true,
                },
              },
            },
          },
        }
      },
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
          THC: strain.THC,
          productType: strain.productType,
          producerId: strain.producerId,
          producerName: strain.producer.name,
          tags: strain.tags.map((tag) => ({
            weight: tag.weight,
            color: tag.tag.color,
            lean: tag.tag.lean,
            name: tag.tag.name,
          })),
        })),
      },
    },
  };
};