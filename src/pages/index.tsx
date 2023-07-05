import Head from "next/head";
import { Search } from "lucide-react";
import Carousel from '@/components/Carousel';
import { prisma } from "@/server/db";
import type { GetServerSideProps } from "next";

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
      <main className="flex min-h-screen flex-col m-auto overflow-hidden space-y-8 w-11/12">
        <div className="flex flex-row items-center gap-2 m-auto">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text px-1 tracking-tight text-transparent">
              Terp
            </span>
            Tracker
          </h1>
        </div>
        <div className="flex w-4/5 flex-row items-center gap-1 space-x-2 sm:w-1/2 mx-auto p-4">
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
    const strains = await prisma.strain.findMany(
      {
        include: {
          producer: {
            select: {
              id: true,
              name: true,
              bannerImage: true,
              location: true,
            },
          },
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

    const producers = await prisma.producer.findMany();

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
