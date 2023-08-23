import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { InfoIcon, Flower2, Droplets, PlusCircle } from "lucide-react";
import NewReviewModal from "@/components/NewReviewModal";
import Head from "next/head";
import Tag from "@/components/Tag";
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
import { VoteButtons } from "@/components/VoteButtons";

// The props this component receives from getServerSideProps
export type StrainProps = {
  strain: StrainWithRelations;
  allTags: TagWithNoRelations[];
  notFound?: boolean;
};

// The main producer component exported in this file
export default function Strain({ strain, allTags }: StrainProps) {
  const { data: sessionData } = useSession();
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
      <PopUp
        data={strain}
        isOpen={isOpen}
        onRequestClose={closeModal}
      ></PopUp>
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-10 mt-4 rounded-lg p-4 lg:p-0">
        <div className="relative">
          <button onClick={() => openModal()} className="absolute m-4 text-white"><InfoIcon /></button>
          <div className="my-2 flex flex-row items-center justify-center gap-2 absolute right-4 top-3">
            {strain.terpTags?.map((tag) => {
              return <Tag tag={tag} key={tag.id} />;
            })}
          </div>
          <Image
            className="rounded-lg w-96 md:w-[450px] lg:w-[500px] h-96 md:h-[450px] lg:h-[500px]"
            src={strain.image}
            width={600}
            height={600}
            alt={"image of " + strain.name}
          />
        </div>
        <div className="h-full lg:overflow-hidden w-80 md:w-96">
          <div>
            <div className="gap-2 rounded-lg p-4 border border-green-600 w-full relative">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold uppercase">{strain.name}</h1>
                <Link
                  className="text-lg font-bold text-green-600 hover:underline badge border-0 gap-2 mt-2 mb-4 py-6"
                  href={producerLink(strain.producerId)}
                >
                  <Image
                    src={strain.producer.bannerImage}
                    alt="Producer Banner Image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {strain.producer.name}{" "}
                  {/*need to make this link to prod name */}
                </Link>
                <p className="badge badge-outline">{Math.floor(strain.thc * 100)}% THC</p>
              </div>
              <p className="badge badge-primary uppercase text-white font-bold h-auto p-3 absolute right-4 bottom-4">{
                //func to check if "flower" or "hash" and display flower or hash icon
                strain.productType === "flower" ? <Flower2 /> : <Droplets />
              }</p>
              {/* Upvote/Downvote Buttons to +/- to strain.vote */}
              <VoteButtons strainId={strain.id} totalVotes={strain.votes} />

            </div>

            <div className="overflow-y-auto max-h-96">
              <ul className="h-full flex flex-col justify-center gap-3 pb-8 pt-4">
                {strain.reviews?.map((review) => {
                  return (
                    <li key={review.id} className="">
                      <ReviewCard review={review} />
                    </li>
                  );
                })}
                {/* Add functionality to this component to only let logged-in users comment */}
                {sessionData ? (
                  <NewReviewModal strainId={strain.id} tagslist={allTags} />
                ) : (
                  <Link href="/api/auth/signin" className="m-auto">
                    <button className="btn w-full bg-neutral text-white hover:bg-primary" onClick={() => window.review_modal.showModal()}>
                      <PlusCircle /> Login To Comment
                    </button>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type ReviewCardProps = {
  review: ReviewWithRelations;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { comment } = review;

  return (
    <div className="rounded-md border p-4 transition-all relative">
      <h3 className="text-lg font-medium">{review.profileName}</h3>
      <p className="text-gray-500 italic">{review.createdAt.toDateString()}</p>
      <p className="text-gray-200 mt-2">{comment}</p>
      {/* if tags, show them */}
      {review.terpTags &&
        <div className="my-2 flex flex-row items-center justify-start gap-4">
          {review.terpTags.map((tag) => {
            return <Tag tag={tag} key={tag.id} />;
          }
          )}
        </div>
      }
    </div>
  );
};

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
