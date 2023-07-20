import Head from "next/head";
import { Search } from "lucide-react";
import Carousel from "@/components/Carousel";
import type { GetServerSideProps } from "next";
import { getFeaturedProducers } from "@/server/database/producers";
import { getFeaturedStrains } from "@/server/database/strains";

export type Strain = {
  id: number;
  name: string;
  batchDate: string;
  THC: number;
  productType: string;
  producerId: number;
  producerName: string;
  producerBannerImage: string;
  image: string;
  tags: {
    weight: number;
    id: number;
    color: string;
    lean: number;
    name: string;
  }[];
};

export type Producer = {
  id: number;
  name: string;
  bannerImage: string;
  location: string;
};

type HomeProps = {
  strains: Strain[];
  producers: Producer[];
};

export default function Home({ strains, producers }: HomeProps) {
  return (
    <>
      <Head>
        <title>TerpTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="m-auto flex min-h-screen w-11/12 flex-col space-y-8 overflow-hidden">
        <div className="m-auto flex flex-row items-center gap-2">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text px-1 tracking-tight text-transparent">
              Terp
            </span>
            Tracker
          </h1>
        </div>
        <div className="mx-auto flex w-4/5 flex-row items-center gap-1 space-x-2 p-4 sm:w-1/2">
          <input
            type="text"
            placeholder="Find what's next in weed..."
            className="input-base-content input-bordered input w-full border-white shadow-xl shadow-green-700/10"
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
    const strains = await getFeaturedStrains();
    const producers = await getFeaturedProducers();

    return {
      props: {
        strains: strains.map((strain) => ({
          id: strain.id,
          name: strain.name,
          batchDate: strain.batchDate.toDateString(),
          productType: strain.productType,
          producerBannerImage: strain.producer.bannerImage,
          THC: strain.THC,
          producerId: strain.producer.id,
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
        producers: producers.map((producer) => ({
          id: producer.id,
          name: producer.name,
          bannerImage: producer.bannerImage,
          location: producer.location,
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
