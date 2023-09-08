import type { GetServerSideProps } from "next";
import Hero from "@/components/Hero";
import Head from "next/head";
import {
  type ProducerWithRelations,
  getProducerById,
} from "@/server/database/producers";
import {
  type StrainWithRelations,
  getStrainsByProducerId,
} from "@/server/database/strains";
import {
  convertDatesToStrings,
  convertStringsToDates,
} from "@/utils/dateSerialization";
import Image from "next/image";
import PopUp from "@/components/PopUp";
import { useState } from "react";
import Carousel from "@/components/Carousel";
import StrainCard from "@/components/StrainCard";

// The props this component receives from getServerSideProps
export type ProducerProps = {
  producer: ProducerWithRelations;
  strains: StrainWithRelations[];
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Producer({ producer, strains }: ProducerProps) {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  producer = convertStringsToDates(producer);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Head>
        <title>{`${producer.name} | TerpTracker`}</title>
      </Head>
      {/* <button onClick={() => openModal()}>Open {producer.name} Modal</button>
      <PopU
        data={producer}
        isOpen={isOpen}
        onRequestClose={closeModal}
      ></PopUp> */}
      <div className="sm:items-left mx-4 mb-4 flex flex-col items-center overflow-hidden bg-slate-100 p-4 sm:flex-row">
        <Image
          src={producer.bannerImage}
          alt="Producer Banner Image"
          width={200}
          height={200}
          className="rounded-full"
        />
        <div className="mb-auto ml-8 mr-8 mt-auto">
          <Hero
            title={producer.name}
            link={producer.website}
            instagram={producer.instagram}
          />
        </div>
      </div>
      <Carousel
        title="🔥 Strains"
        data={strains}
        renderItem={(strain) => <StrainCard strain={strain} />}
        getKey={(strain) => strain.name}
      />
    </>
  );
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

  let strains = await getStrainsByProducerId(producerId);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  producer = convertDatesToStrings(producer);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  strains = convertDatesToStrings(strains);
  console.log(producer); // eslint-disable-line no-console

  if (!producer) {
    return { notFound: true };
  }

  return {
    props: {
      producer: producer,
      strains: strains,
    },
  };
};
