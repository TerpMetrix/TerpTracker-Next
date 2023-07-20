import { type GetServerSideProps } from "next";
import { prisma } from "@/server/db";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import BackButton from "@/components/BackButton";

type Producer = {
  id: number;
  name: string;
  location: string;
  website: string;
  bannerImage?: string;
};

type ProducersProps = {
  producers: Producer[];
  notFound?: boolean;
};

// Main exported component for Producer page
export default function Producers({ producers }: ProducersProps) {
  return (
    <>
      <Head>
        <title>Producers | Terptracker</title>
      </Head>
      <BackButton />
      <div className="flex flex-col items-center">
        <div className="w-screen">
          <div className="flex pt-10 flex-col items-center justify-center">
            <h1 className="text-4xl">Producers</h1>
            <p className="italic text-gray-700">
              The most popular producers in the state.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 py-10">
            {producers.map((producer) => (
              <Producer key={producer.id} producer={producer} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Producer({ producer }: { producer: Producer }) {
  return (
    <Link href={`/producer/${producer.id}`}>
      <div className="card w-96 bg-base-100 transition-all hover:-translate-y-2 hover:bg-secondary shadow-lg shadow-gray-100/5">
        <figure>
          <Image
            className="h-48 w-full overflow-hidden object-cover object-center"
            src={producer.bannerImage || ""}
            width={400}
            height={200}
            alt={"banner image of " + producer.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title capitalize">
            {producer.name}
            <div className="badge badge-info">NEW</div>
          </h2>
          <p>{producer.location}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">Flower</div>
            <div className="badge badge-outline">Concentrate</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Fetch the data to render on the page
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
          bannerImage: producer.bannerImage,
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
