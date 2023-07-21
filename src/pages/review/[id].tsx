import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getReviewById } from "@/server/database/reviews";
import type { Review } from "@/server/database/types";

type ReviewProps = {
  review: Review | null;
};

// Main component
export default function Review({ review }: ReviewProps) {
  if (review === null) {
    return <div>Review not found</div>;
  }

  return (
    <div>
      <p>Review id: {review.id}</p>
      <p>{review.comment}</p>
      <p>{review.profileName}</p>
      <Link href={"/strain/" + String(review.strainId)}>
        {review.strainName}
      </Link>
      <p>{review.createdAt}</p>
    </div>
  );
}

// Get server side props
export const getServerSideProps: GetServerSideProps<ReviewProps> = async (
  context
) => {
  const review = await getReviewById(Number(context.params?.id));

  if (!review) {
    return {
      props: {
        review: null,
      },
    };
  }

  return {
    props: {
      review: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        profileId: review.profileId,
        profileName: review.Profile?.profileName ?? "",
        strainId: review.strainId,
        strainName: review.Strain.name,
        createdAt: review.createdAt.toISOString(),
      },
    },
  };
};
