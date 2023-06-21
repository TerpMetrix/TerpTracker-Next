import type { GetServerSideProps } from "next";
import { prisma } from "@/server/db";
import Link from "next/link";

type ReviewProps = {
  review: {
    id: number;
    comment: string;
    rating: number;
    profileId: string;
    strainId: number;
  };
  notFound?: boolean;
};

// Main component
export default function Review({ review }: ReviewProps) {
  return (
    <div>
      <p>Review id: {review.id}</p>
      <p>{review.comment}</p>
      <p>{review.profileId}</p>
      <Link href={"/strain/" + String(review.strainId)}>
        Strain id: {review.strainId}
      </Link>
    </div>
  );
}

// Get server side props
export const getServerSideProps: GetServerSideProps<ReviewProps> = async (
  context
) => {
  const review = await prisma.review.findUnique({
    where: {
      id: Number(context.params?.id) || -1,
    },
  });

  if (!review) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      review: {
        id: review.id,
        comment: review.comment,
        rating: review.rating,
        profileId: review.profileId,
        strainId: review.strainId,
      },
    },
  };
};
