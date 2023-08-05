import type { GetServerSideProps } from "next";
import Link from "next/link";
import Hero from "@/components/hero";
import Head from "next/head";
import Tag from "@/components/tag";
import BackButton from "@/components/BackButton";
import {
  type ProducerWithRelations,
  getProducerById,
} from "@/server/database/producers";
import {
  convertDatesToStrings,
  convertStringsToDates,
} from "@/utils/dateSerialization";
import Image from "next/image";

// The props this component receives from getServerSideProps
export type ProducerProps = {
  producer: ProducerWithRelations;
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Producer({ producer }: ProducerProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  producer = convertStringsToDates(producer);

  return (
    <>
      <Head>
        <title>{`${producer.name} | TerpTracker`}</title>
      </Head>
      <BackButton />
      <div className="mb-4 flex flex-col items-center">
        <Image
          src={producer.bannerImage}
          alt="Producer Banner Image"
          width={1000}
          height={300}
          className="rounded-lg"
        />
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
                <StrainsList producer={producer} />
          </ul>
        </div>
      </div>
    </>
  );
}

function StrainsList({ producer }: { producer: ProducerWithRelations }) {
  const strains = producer.Strains?.map((strain) => {
    return (
      <>
        <Link href={"/strain/" + String(strain.id)}>
          <div className="card w-96 bg-neutral text-neutral-content">
            <div className="card-body">
              <h2 className="card-title">{strain.name}</h2>
              <div className="flex">
                <div className="my-2 flex flex-row gap-4">
                  {strain.TerpTags?.map((tag) => {
                    return <Tag tag={tag} key={tag.id} />;
                  })}
                </div>
              </div>
              <div className="text-gray-40 mb-3">
                {strain.batchDate.toDateString()}
              </div>
              <button className="btn w-20 border-0 bg-green-500 text-white hover:bg-green-600">
                💬
              </button>
            </div>
          </div>
        </Link>
      </>
    );
  });
  return strains;
}

// getServerSideProps only runs on the server. never on the client.
// We can make calls to our database directly here.
// That data is then passed to the component as props.
export const getServerSideProps: GetServerSideProps<ProducerProps> = async (
  context
) => {
  const id = context.params?.id;
  if (!id) {
    return { notFound: true };
  }

  const producerId = Number(id);
  if (isNaN(producerId)) {
    return { notFound: true };
  }

  let producer = await getProducerById(producerId);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  producer = convertDatesToStrings(producer);
  console.log(producer); // eslint-disable-line no-console

  if (!producer) {
    return { notFound: true };
  }

  return {
    props: {
      producer: producer,
    },
  };
};
