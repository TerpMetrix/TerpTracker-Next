import { type GetServerSideProps } from "next";
import { prisma } from "@/server/db";
import Link from "next/link";
import Image from "next/image";

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
    <div className="flex flex-wrap justify-center gap-10 py-20">
      {producers.map((producer) => (
        <Producer key={producer.id} producer={producer} />
      ))}
    </div>
  );
}

function Producer({ producer }: { producer: Producer }) {
  return (
    <Link href={`/producer/${producer.id}`}>
      <div className="card w-96 bg-base-100 shadow-xl">
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
            <div className="badge badge-secondary">NEW</div>
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
