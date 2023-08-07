import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import { ArrowUpRight, Star, InfoIcon, Flower2, Droplets } from "lucide-react";
import NewReviewModal from "@/components/NewReviewModal";
import Head from "next/head";
import Tag from "@/components/Tag";
import BackButton from "@/components/BackButton";
import {
  type ReviewWithRelations
}
  from "@/server/database/reviews";
import {
  type StrainWithRelations,
  getStrainById
} from "@/server/database/strains";
import {
  type TagWithNoRelations,
  getAllTags
}
  from "@/server/database/tags";
import {
  convertDatesToStrings,
  convertStringsToDates,
}
  from "@/utils/dateSerialization";
import Image from "next/image";
import PopUp from "@/components/PopUp";
import { useState } from "react";

// The props this component receives from getServerSideProps
export type StrainProps = {
  strain: StrainWithRelations;
  allTags: TagWithNoRelations[];
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Strain({ strain, allTags }: StrainProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  strain = convertStringsToDates(strain);
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
        <title>{strain.name} | TerpTracker</title>
      </Head>
      <BackButton />
      <PopUp
        data={strain}
        isOpen={isOpen}
        onRequestClose={closeModal}
      ></PopUp>
      <div className="flex flex-row items-start justify-center gap-10">
        <div>
          <button onClick={() => openModal()} className="absolute m-4 align-right"><InfoIcon /></button>
          <Image
            className="rounded-lg"
            src={strain.image}
            width={500}
            height={500}
            alt={"image of " + strain.name}
          />
        </div>
        <div>
          <div className="flex flex-col items-center justify-center gap-4 bg-neutral rounded-lg p-4">
            <h1 className="text-2xl">{strain.name}</h1>
            <p className="badge">{Math.floor(strain.THC * 100)}% THC</p>
            <p className="badge badge-primary uppercase text-white font-bold h-auto p-3">{
            //func to check if "flower" or "hash" and display flower or hash icon
            strain.productType === "flower" ? <Flower2/> : <Droplets/>
            }</p>
            <div className="my-2 flex flex-row items-center justify-center gap-4">
              {strain.TerpTags?.map((tag) => {
                return <Tag tag={tag} key={tag.id} />;
              })}
            </div>
            <Link
              className="btn-outline btn"
              href={producerLink(strain.producerId)}
            >
              <Image
                src={strain.Producer.bannerImage}
                alt="Producer Banner Image"
                width={20}
                height={20}
                className="rounded-full"
              />
              {strain.Producer.name}{" "}
              {/*need to make this link to prod name */}
            </Link>
          </div>
          <ul className="flex flex-col gap-4 p-4">
            {strain.Reviews?.map((review) => {
              return (
                <li key={review.id}>
                  <ReviewCard review={review} />
                </li>
              );
            })}
            <NewReviewModal strainId={strain.id} tagslist={allTags} />

          </ul>
        </div>
      </div>
    </>
  );
}

type ReviewCardProps = {
  review: ReviewWithRelations;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { rating, comment } = review;

  return (
    <div className="rounded-md border p-4 transition-all hover:-translate-y-2 hover:bg-neutral ">
      <h3 className="mb-1 text-lg font-medium">{review.profileName}</h3>
      <RatingStars rating={rating} />
      <p className="text-gray-400">{review.createdAt.toDateString()}</p>
      <p className="text-gray-200">{comment}</p>
      {/* if tag, show it */}
      {review.TerpTag &&
        <div className="my-2 flex flex-row items-center justify-start gap-4">
          <Tag tag={review.TerpTag} key={review.TerpTag.id} />
        </div>
      }
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
  const id = Number(context.params?.id) || -1;

  const allTags = await getAllTags();

  let strain = await getStrainById(id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  strain = convertDatesToStrings(strain)
  console.log(strain);

  if (!strain) {
    return { notFound: true };
  }

  if (!allTags) {
    return { notFound: true };
  }

  return {
    props: {
      strain: strain,
      allTags: allTags,
    },
  };
};
