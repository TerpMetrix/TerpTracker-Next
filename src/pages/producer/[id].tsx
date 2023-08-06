import type { GetServerSideProps } from "next";
import Hero from "@/components/Hero";
import Head from "next/head";
import BackButton from "@/components/BackButton";
import {
  type ProducerWithRelations,
  getProducerById,
} from "@/server/database/producers";
import {
  convertDatesToStrings,
  convertStringsToDates,
} from "@/utils/dateSerialization";
import Image from "next/image";
import PopUp from "@/components/PopUp";
import { useState } from "react";
import Carousel from "@/components/Carousel";

// The props this component receives from getServerSideProps
export type ProducerProps = {
  producer: ProducerWithRelations;
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Producer({ producer }: ProducerProps) {
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
      <BackButton />
      <button onClick={() => openModal()}>Open {producer.name} Modal</button>
      <PopUp
        data={producer}
        isOpen={isOpen}
        onRequestClose={closeModal}
      ></PopUp>
      <div className="mb-4 flex flex-col items-center">
        <Image
          src={producer.bannerImage}
          alt="Producer Banner Image"
          width={1000}
          height={300}
          className="rounded-lg"
        />
        <Hero
          title={producer.name}
          description="Generic default description of this producer. Should add a database column for an about."
          link={producer.website}
        />
        <div className="flex w-full justify-center">
          <ul
            id="#strains"
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <Carousel
              title="🔥 Producers"
              data={
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                convertDatesToStrings(producer.Strains)
              }
            />
          </ul>
        </div>
      </div>
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  producer = convertDatesToStrings(producer);
  console.log(producer); // eslint-disable-line no-console

  if (!producer) {
    return { notFound: true };
  }

  return {
    props: {
      producer: producer,
    },
  };
};
