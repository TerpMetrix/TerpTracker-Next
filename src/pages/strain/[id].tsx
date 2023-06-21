import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { prisma } from "@/server/db";
import Link from "next/link";

// The props this component receives from getServerSideProps
export type StrainProps = {
  strain: {
    id: number;
    name: string;
    batchDate: string;
    THC: number;
    productType: string;
    producerId: number;
  };
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Strain({ strain }: StrainProps) {
  return (
    <div>
      <p>{strain.THC}</p>
      <p>{strain.batchDate}</p>
      <Link href={producerLink(strain.id)}>{strain.name}</Link>
      <p>{strain.productType}</p>
    </div>
  );
}

function producerLink(id: number) {
  return "/producer/" + id;
}

// getServerSideProps only runs on the server.
// It will never run on the client.
// That means we can safely make calls to our database here.
// That data is then passed to the component as props.
export const getServerSideProps: GetServerSideProps<StrainProps> = async (
  context: GetServerSidePropsContext
) => {
  const strain = await prisma.strain.findUnique({
    where: {
      id: Number(context.params?.id) || -1,
    },
  });

  if (!strain) {
    return { notFound: true };
  }

  return {
    props: {
      strain: {
        id: strain.id,
        name: strain.name,
        batchDate: strain.batchDate.toDateString(),
        THC: strain.THC,
        productType: strain.productType,
        producerId: strain.producerId,
      },
    },
  };
};
