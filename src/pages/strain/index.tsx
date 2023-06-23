import { type GetServerSideProps } from "next";
import { prisma } from "@/server/db";
import Head from "next/head";

type Strain = {
  id: number;
  name: string;
  batchDate: string;
  productType: string;
  THC: number;
  producerId: number;
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
          <ul className="mb-10 flex flex-col gap-4 px-4">
            {strains.map((strain) => (
              <StrainItem key={strain.id} strain={strain} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function StrainItem({ strain }: { strain: Strain }) {
  return (
    <li>
      <a href={"/strain/" + String(strain.id)}>
        <div className="card p-4 transition-all hover:-translate-y-2 bg-base-100 hover:bg-secondary shadow-lg shadow-gray-100/5">
          <p className="mb-2 text-lg font-medium">{strain.name}</p>
          <p className="badge badge-info  mb-2">{strain.productType}</p>
          <p className="text-gray-500">{strain.batchDate}</p>
          <p className="text-gray-500">{Math.floor(strain.THC * 100)}% THC</p>
        </div>
      </a>
    </li>
  );
}

export const getServerSideProps: GetServerSideProps<
  StrainsProps
> = async () => {
  try {
    const strains = await prisma.strain.findMany();

    return {
      props: {
        strains: strains.map((strain) => ({
          id: strain.id,
          name: strain.name,
          batchDate: strain.batchDate.toDateString(),
          productType: strain.productType,
          THC: strain.THC,
          producerId: strain.producerId,
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
