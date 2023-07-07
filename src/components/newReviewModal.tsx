import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { X } from 'lucide-react'
import { prisma } from "@/server/db";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import Tag from "./tag";


declare global {
  interface Window {
    review_modal: HTMLDialogElement;
  }
}

export type Tags = {
  id: number;
  color: string;
  lean: number;
  name: string;
};

type TerpTagProps = {
  tags: Tags[];
  notFound?: boolean;
};

export const getServerSideProps: GetServerSideProps<TerpTagProps> = async (
  context: GetServerSidePropsContext
) => {

  const tags = await prisma.terpTag.findMany({
    select: {
      id: true,
      name: true,
      lean: true,
      color: true,
    },
  });

  if (!tags) {
    return { notFound: true };
  }

  return {
    props: {
      notFound: false,
      tags: tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        lean: tag.lean,
        color: tag.color,
      })),
    },
  };
}


type NewReviewModalProps = {
  strainId: number;
  tagslist?: Tags[];
};

export default function NewReviewModal({ strainId, tagslist }: NewReviewModalProps) {
  const { data: sessionData } = useSession();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState<Tags[]>([]); //should be an array of tag ids

  const mutation = api.reviews.newReview.useMutation();

  const handleSubmit = () => { //should close the modal as well and refresh the data
    const res = mutation.mutate({
      rating: rating,
      comment: comment,
      strainId: strainId,
      profileId: sessionData?.user.id || "",
    });

    console.log(res);
    window.review_modal.close();
  };

  return (
    <>
      <button className="btn" onClick={() => window.review_modal.showModal()}>
        New Review
      </button>
      <dialog id="review_modal" className="modal">
        <div className="modal-box">
          <div className="modal-action mt-0 mb-4">
            <button onClick={() => window.review_modal.close()}>
              <X className="text-xl" />
            </button>
          </div>
          <form
            method="dialog"
            className="flex flex-col items-center gap-3"
          >
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Your review"
              className="input-bordered input-primary input w-full max-w-xs"
            />
            <select
              onChange={(e) => setRating(Number(e.target.value))}
              value={rating}
              className="select-primary select w-full max-w-xs"
            >
              <option disabled>Rating</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>

            {/*TAG SELECTOR*/}
            <div className="flex flex-row items-center justify-center gap-4 my-2">
              <select onChange={(e) => setTags([...tagslist, Number(e.target.value)])} className="select-primary select w-full max-w-xs">
                {tagslist.map((tag) => {
                  return <Tag tag={tag} key={tag.id} />;
                }
                )}
              </select>
            </div>

            <div className="modal-action">
              <div onClick={() => handleSubmit()} className="btn-primary btn">
                Submit
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}