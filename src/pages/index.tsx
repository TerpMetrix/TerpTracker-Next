import Head from "next/head";
import { Search } from "lucide-react";
import Carousel from "@/components/Carousel";
import type { GetServerSideProps } from "next";
import {
  getAllProducersWithRelations,
  type ProducerWithRelations,
} from "@/server/database/producers";
import {
  getAllStrainsWithRelations,
  type StrainWithRelations,
} from "@/server/database/strains";
import {
  convertDatesToStrings,
  convertStringsToDates,
} from "@/utils/dateSerialization";

type HomeProps = {
  strains: StrainWithRelations[];
  producers: ProducerWithRelations[];
};

export default function Home({ strains, producers }: HomeProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  producers = convertStringsToDates(producers);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  strains = convertStringsToDates(strains);

  return (
    <>
      <Head>
        <title>TerpTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-auto flex min-h-screen w-11/12 flex-col space-y-8 overflow-hidden">
        <div className="m-auto flex flex-row items-center">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text px-1 tracking-tight text-transparent">
              Terp
            </span>
            Tracker
          </h1>
        </div>
        <div className="mx-auto flex w-4/5 flex-row items-center gap-1 space-x-2 px-0 sm:w-1/2 md:px-4">
          <input
            type="text"
            placeholder="Find what's next in weed..."
            className="input-base-content input w-full border-white shadow-xl shadow-green-700/10"
          />
          <button className="btn border-0 bg-green-600 shadow-xl shadow-green-700/10 hover:bg-green-700">
            <Search className="w-6 sm:w-full" />
          </button>
        </div>
        <Carousel title="🔥 Strains" data={strains} />
        <Carousel title="🔥 Producers" data={producers} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    let strains = await getAllStrainsWithRelations();
    let producers = await getAllProducersWithRelations();

    // iterate on strains with dateserialization function

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    strains = convertDatesToStrings(strains);

    // iterate on producers with dateserialization function
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    producers = convertDatesToStrings(producers);

    return {
      props: {
        strains: strains,
        producers: producers,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};
