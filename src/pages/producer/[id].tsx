import type { GetServerSideProps } from "next";
import Link from "next/link";
import { prisma } from "@/server/database/db";
import Hero from "@/components/hero";
import Head from "next/head";
import Tag from "@/components/tag";
import BackButton from "@/components/BackButton";
import { Producer, Strain } from "@/server/database/types";
import { getProducerById } from "@/server/database/producers";

// The props this component receives from getServerSideProps
export type ProducerProps = {
  producer: Producer;
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Producer({ producer }: ProducerProps) {
  return (
    <>
      <Head>
        <title>{producer.name} | TerpTracker</title>
      </Head>
      <BackButton />
      <div className="mb-4 flex flex-col items-center">
        <Hero
          title={producer.name}
          description="Generic default description of this producer. Should add a database column for an about."
          link={producer.website}
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
    <>
      <Link href={"/strain/" + String(strain.id)}>
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body">
            <h2 className="card-title">{strain.name}</h2>
            <div className="flex">
              <div className="my-2 flex flex-row gap-4">
                {strain.tags?.map((tag) => {
                  return <Tag tag={tag} key={tag.id} />;
                })}
              </div>
            </div>
            <div className="text-gray-40 mb-3">{strain.batchDate}</div>
            <button className="btn w-20 border-0 bg-green-500 text-white hover:bg-green-600">
              10 💬
            </button>
          </div>
        </div>
      </Link>
    </>
  );
}

// getServerSideProps only runs on the server. never on the client.
// We can make calls to our database directly here.
// That data is then passed to the component as props.
export const getServerSideProps: GetServerSideProps<ProducerProps> = async (
  context
) => {
  const producer = await getProducerById(Number(context.params?.id));

  if (!producer) {
    return { notFound: true };
  }

  return {
    props: {
      producer: {
        id: producer.id,
        bannerImage: producer.bannerImage,
        location: producer.location,
        name: producer.name,
        website: producer.website,
        strains: producer.strains.map((strain) => ({
          image: strain.image,
          id: strain.id,
          name: strain.name,
          batchDate: strain.batchDate.toDateString(),
          THC: strain.THC,
          productType: strain.productType,
          producerId: strain.producerId,
          producerName: producer.name,
          tags: strain.tags.map((tag) => ({
            weight: tag.weight,
            id: tag.tag.id,
            color: tag.tag.color,
            lean: tag.tag.lean,
            name: tag.tag.name,
          })),
        })),
      },
    },
  };
};
