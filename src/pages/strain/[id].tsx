import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { prisma } from "@/server/db";
import Link from "next/link";

export type Strain = {
  id: number;
  name: string;
  batchDate: string;
  THC: number;
  productType: string;
  producerId: number;
  reviews: Review[];
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  profileId: string | null;
};

// The props this component receives from getServerSideProps
export type StrainProps = {
  strain: Strain;
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Strain({ strain }: StrainProps) {
  return (
    <div>
      <h1>{strain.name}</h1>
      <p>{strain.THC}</p>
      <p>{strain.batchDate}</p>
      <Link href={producerLink(strain.id)}>{strain.name}</Link>
      <p>{strain.productType}</p>
      <ul>
        {strain.reviews.map((review) => {
          return (
            <li key={review.id}>
              <p>{review.comment}</p>
              <p>{review.rating}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function producerLink(id: number) {
  return "/producer/" + String(id);
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
    include: {
      reviews: true,
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
        reviews: strain.reviews.map((review) => ({
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          profileId: review.profileId,
        })),
      },
    },
  };
};
