import { type GetServerSideProps } from "next";
import Head from "next/head";
import Tag from "@/components/tag";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import type { Strain } from "@/server/database/types";
import { getAllStrainsWithRelations } from "@/server/database/strains";

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
      <BackButton />
      <div className="flex flex-col items-center">
        <div className="w-screen md:w-2/3">
          <div className="flex flex-col items-center justify-center py-8">
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
      <Link href={`/strain/${strain.id}`}>
        <div className="card w-96 bg-base-100 shadow-lg shadow-gray-100/5 transition-all hover:-translate-y-2 hover:bg-secondary">
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

          <div className="my-2 flex flex-row gap-4">
            {strain.TerpTags?.map((tag) => {
              return <Tag tag={tag} key={tag.id} />;
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
    const strains = await getAllStrainsWithRelations();

    return {
      props: {
        strains: strains.map((strain) => ({
          id: strain.id,
          name: strain.name,
          batchDate: strain.batchDate.toDateString(),
          productType: strain.productType,
          THC: strain.THC,
          producerId: strain.producerId,
          producerName: strain.Producer.name,
          Producer: strain.Producer,
          image: strain.image,
          TerpTags: strain.TerpTags.map((tag) => ({
            id: tag.id,
            color: tag.color,
            lean: tag.lean,
            name: tag.name,
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
