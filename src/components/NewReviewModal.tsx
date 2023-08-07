import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { X } from "lucide-react";
import Tag from "./Tag";

declare global {
  interface Window {
    review_modal: HTMLDialogElement;
  }
}

export type Tag = {
  id: number;
  color: string;
  lean: number;
  name: string;
};

type NewReviewModalProps = {
  strainId: number;
  tagslist: Tag[];
};

export default function NewReviewModal({
  strainId,
  tagslist,
}: NewReviewModalProps) {
  const { data: sessionData } = useSession();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [selectedTag, setTag] = useState<Tag>(); //should be an array of tag ids

  const mutation = api.reviews.newReview.useMutation();

  const handleSubmit = () => {
    //should close the modal as well and refresh the data
    const res = mutation.mutate({
      rating: rating,
      comment: comment,
      strainId: strainId,
      profileName: sessionData?.user.name || "",
      tagId: selectedTag?.id || 0,
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
          <div className="modal-action mb-4 mt-0">
            <button onClick={() => window.review_modal.close()}>
              <X className="text-xl" />
            </button>
          </div>
          <form method="dialog" className="flex flex-col items-center gap-3">
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
            <div className="my-2 flex flex-row items-center justify-center gap-4">
              <select
                onChange={(e) =>
                  setTag(tagslist.find((tag) => tag.name === e.target.value))
                }
                className="select-primary select w-full max-w-xs"
              >
                {tagslist.map((tag) => {
                  return <option key={tag.id}>{tag.name}</option>;
                })}
              </select>
            </div>

            {/* Selected TAG DISPLAY CHECK */}
            <div className="my-2 flex flex-row items-center justify-center gap-4">
              {selectedTag ? <Tag tag={selectedTag} /> : <></>}
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
