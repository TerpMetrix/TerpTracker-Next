import { type GetServerSideProps } from "next";
import { prisma } from "@/server/db";
import Head from "next/head";
import Tag from "@/components/tag";
import Image from "next/image";
import Link from "next/link";

export type Strain = {
  id: number;
  name: string;
  batchDate: string;
  THC: number;
  productType: string;
  producerId: number;
  producerName: string;
  image: string;
  tags: Tags[];
};

export type Tags = {
  id: number;
  weight: number;
  color: string;
  lean: number;
  name: string;
};

type StrainsProps = {
  strains: Strain[];
  notFound?: boolean;
};

// Main exported component for Strains page
export default function Strains({ strains }: StrainsProps) {
  return (
    <>
      <Head>
        <title>Strains | TerpTracker</title>
      </Head>

      <div className="flex flex-col items-center">
        <div className="w-screen md:w-2/3">
          <div className="flex py-8 flex-col items-center justify-center">
            <h1 className="text-4xl">Strains</h1>
            <p className="italic text-gray-700">
              What the best producers are making.
            </p>
          </div>
          
          
          <div className="flex w-full justify-center">
          <ul
            id="#strains"
            className="flex flex-wrap items-center justify-center gap-5"
          >
            {strains.map((strain) => (
              <StrainItem key={strain.id} strain={strain} />
            ))}
          </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function StrainItem({ strain }: { strain: Strain }) {
  return (
    <>
    <Link href={`/producer/${strain.id}`}>
      <div className="card w-96 bg-base-100 transition-all hover:-translate-y-2 hover:bg-secondary shadow-lg shadow-gray-100/5">
        <figure>
          <Image
            className="h-48 w-full overflow-hidden object-cover object-center"
            src={strain.image || ""}
            width={400}
            height={200}
            alt={"image of " + strain.name}
          />
        </figure>

        <p className="mb-2 text-lg font-medium">{strain.name}</p>
        <p className="badge badge-info  mb-2">{strain.productType}</p>
        <p className="text-gray-500">{strain.batchDate}</p>

        <div className="flex flex-row gap-4 my-2">
          {strain.tags.map((tag) => {
            return <Tag tag={tag} key={tag.id}/>;
          })}
        </div>

        <p className="text-gray-500">{Math.floor(strain.THC * 100)}% THC</p>
      </div>
    </Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  StrainsProps
> = async () => {
  try {
    const strains = await prisma.strain.findMany(
      {
        include: {
          producer: true,
          tags: {
            select: {
              weight: true,
              tag: {
                select: {
                  id: true,
                  name: true,
                  color: true,
                  lean: true,
                },
              },
            },
          }
        },
      },
    );

    return {
      props: {
        strains: strains.map((strain) => ({
          id: strain.id,
          name: strain.name,
          batchDate: strain.batchDate.toDateString(),
          productType: strain.productType,
          THC: strain.THC,
          producerId: strain.producerId,
          producerName: strain.producer.name,
          image: strain.image,
          tags: strain.tags.map((tag) => ({
            weight: tag.weight,
            id: tag.tag.id,
            color: tag.tag.color,
            lean: tag.tag.lean,
            name: tag.tag.name,
          })),
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