import Head from "next/head";
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
import StrainCard from "@/components/StrainCard";
import ProducerCard from "@/components/ProducerCard";
import SearchBar from "@/components/SearchBar";

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
        <SearchBar/>
        <Carousel title="🔥 Strains"
          data={strains}
          renderItem={(strain) => <StrainCard strain={strain} />}
          getKey={(strain) => strain.name} />
        <Carousel title="🔥 Producers"
          data={producers}
          renderItem={(producer) => <ProducerCard producer={producer} />}
          getKey={(producer) => producer.name} />
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
