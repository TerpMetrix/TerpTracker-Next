import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { prisma } from "@/server/db";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import NewReviewModal from "@/components/newReviewModal";

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
  profileId: string;
  userName?: string;
  createdAt?: string;
  profileName: string | null;
};

// The props this component receives from getServerSideProps
export type StrainProps = {
  strain: Strain;
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Strain({ strain }: StrainProps) {
  return (
    <div className="mb-10 min-h-screen">
      <div className="flex h-96 flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl">{strain.name}</h1>
          <p className="italic text-gray-400">
            Quick description of this strain.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <p className="badge">{Math.floor(strain.THC * 100)}% THC</p>
          <p className="badge">{strain.batchDate}</p>
          <p className="badge badge-primary">{strain.productType}</p>
        </div>
        <Link
          className="btn-outline btn"
          href={producerLink(strain.producerId)}
        >
          {strain.producerId} <ArrowUpRight /> {/*need to make this link to prod name */}
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center">
        <ul className="flex w-screen flex-col gap-4 p-4 md:w-2/3">
          {strain.reviews.map((review) => {
            return (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            );
          })}
        </ul>
        <NewReviewModal strainId={strain.id} />
      </div>
    </div>
  );
}

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { rating, comment } = review;

  return (
    <div className="rounded-md border p-4 transition-all hover:-translate-y-2 hover:bg-neutral ">
      <h3 className="mb-1 text-lg font-medium">{review.profileName}</h3>
      <RatingStars rating={rating} />
      <p className="text-gray-400">{review.createdAt}</p>
      <p className="text-gray-200">{comment}</p>
    </div>
  );
};

function RatingStars({ rating }: { rating: number }) {
  //  if we somehow get a rating over 5, just cap it at 5
  const MAX_STARS = 5;
  rating %= MAX_STARS + 1;

  const filledStars = [];
  const emptyStars = [];

  for (let i = 0; i < rating; i++) {
    filledStars.push(<Star className="h-4" key={i} fill="currentColor" />);
  }
  for (let i = rating; i < MAX_STARS; i++) {
    emptyStars.push(<Star className="h-4" key={i} stroke="gray" />);
  }
  return (
    <div className="mb-4 flex">
      {filledStars}
      {emptyStars}
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
    select: {
      id: true,
      name: true,
      batchDate: true,
      THC: true,
      productType: true,
      producerId: true,
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          profileId: true,
          Profile: {
            select: {
              profileName: true,
            },
          },
        },
      },
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
          profileName: review.Profile?.profileName,
          createdAt: review.createdAt.toDateString(),
        })),
      },
    },
  };
};
