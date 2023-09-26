import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { InfoIcon, Flower2, Droplets, PlusCircle } from "lucide-react";
import NewReviewModal from "@/components/NewReviewModal";
import Head from "next/head";
import Tag from "@/components/Tag";
import {
  type StrainWithRelations,
  getStrainById,
} from "@/server/database/strains";
import { type TagWithNoRelations, getAllTags } from "@/server/database/tags";
import {
  convertDatesToStrings,
  convertStringsToDates,
} from "@/utils/dateSerialization";
import Image from "next/image";
import PopUp from "@/components/PopUp";
import { useState } from "react";
import { VoteButtons } from "@/components/VoteButtons";
import VCarousel from "@/components/VCarousel";
import CommentCard from "@/components/CommentCard";

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
      <PopUp data={strain} isOpen={isOpen} onRequestClose={closeModal}></PopUp>
      <div className="flex flex-col items-center gap-10 rounded-lg p-4 md:mt-4 md:flex-row md:items-start md:justify-center md:p-0">
        <div className="relative">
          <button onClick={openModal} className="absolute m-4 text-white">
            <InfoIcon />
          </button>
          <div className="absolute right-4 top-3 my-2 flex flex-row items-center justify-center gap-2">
            {strain.terpTags?.map((tag) => {
              return <Tag tag={tag} key={tag.id} />;
            })}
          </div>
          <Image
            className="h-96 w-96 rounded-lg md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px]"
            src={strain.image}
            width={600}
            height={600}
            alt={"image of " + strain.name}
          />
        </div>
        <div className="h-full w-full md:w-96 lg:overflow-hidden">
          <div className="w-full">
            <div className="relative w-full gap-2 rounded-lg border border-green-600 p-4">
              <div className="flex flex-col">
                <div className="flex max-w-xs flex-row items-center">
                  <h1 className="w-52 text-2xl font-bold uppercase">
                    {strain.name}
                  </h1>
                  <p className="badge badge-primary h-auto p-3 font-bold uppercase text-white">
                    {
                      //func to check if "flower" or "hash" and display flower or hash icon
                      strain.productType === "flower" ? (
                        <Flower2 />
                      ) : (
                        <Droplets />
                      )
                    }
                  </p>
                </div>
                <Link
                  className="badge mb-4 mt-2 gap-2 border-0 py-6 text-lg font-bold text-green-600 hover:underline"
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
                <p className="badge badge-outline">
                  {Math.floor(strain.thc * 100)}% THC
                </p>
              </div>
              {/* Upvote/Downvote Buttons to +/- to strain.vote */}
              <VoteButtons strainId={strain.id} totalVotes={strain.votes} />
            </div>

            <ul className="flex h-full flex-col justify-center gap-3">
              <VCarousel
                className="mt-4 max-h-96"
                data={strain.reviews}
                renderItem={(review) => (
                  <CommentCard review={review} forStrain={true} />
                )}
              />

              {/* Add functionality to this component to only let logged-in users comment */}
              {sessionData ? (
                <NewReviewModal strainId={strain.id} tagslist={allTags} />
              ) : (
                <Link href="/api/auth/signin" className="m-auto">
                  <button
                    className="btn w-full bg-neutral text-white hover:bg-primary"
                    onClick={() => window.review_modal.showModal()}
                  >
                    <PlusCircle /> Login To Comment
                  </button>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
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
  strain = convertDatesToStrings(strain);

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
