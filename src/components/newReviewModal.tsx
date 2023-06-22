import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

declare global {
  interface Window {
    review_modal: HTMLDialogElement;
  }
}

type NewReviewModalProps = {
  strainId: number;
};

export default function NewReviewModal({ strainId }: NewReviewModalProps) {
  const { data: sessionData } = useSession();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const mutation = api.reviews.newReview.useMutation();

  const handleSubmit = () => {
    const res = mutation.mutate({
      rating: rating,
      comment: comment,
      strainId: strainId,
      profileId: sessionData?.user.id || "",
    });
    console.log(res);
  };

  return (
    <>
      <button className="btn" onClick={() => window.review_modal.showModal()}>
        New Review
      </button>
      <dialog id="review_modal" className="modal">
        <form
          method="dialog"
          className="modal-box flex flex-col items-center gap-3"
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
          <div className="modal-action">
            <div onClick={() => handleSubmit()} className="btn-primary btn">
              Submit
            </div>
            <button className="btn-warning btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
