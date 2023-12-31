import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  X,
  PlusCircle,
  XCircle,
  CheckCircle,
  CircleEllipsis,
} from "lucide-react";
import Tag from "./Tag";
import Select from "react-select";

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

type OptionType = { value: number; label: string };
type MultiValue<T> = ReadonlyArray<T> | null | undefined;

export default function NewReviewModal({
  strainId,
  tagslist,
}: NewReviewModalProps) {
  const { data: sessionData } = useSession();
  const [comment, setComment] = useState("");
  const [selectedTags, setTags] = useState<Tag[]>([]);

  const mutation = api.reviews.newReview.useMutation();

  const handleSubmit = () => {
    //should close the modal as well and refresh the data
    const res = mutation.mutate({
      //pass in data as arrays to be mapped over
      comment: comment,
      strainId: strainId,
      profileName: sessionData?.user.name || "",
      tagIds: selectedTags.map((tag) => tag.id),
    });
    console.log(res);

    window.review_modal.close();
  };

  const handleTagChange = (selectedOptions: MultiValue<OptionType>) => {
    if (selectedOptions) {
      const newTags = selectedOptions
        .map((option) => tagslist.find((tag) => tag.id === option.value))
        .filter((tag): tag is Tag => tag !== undefined);
      setTags(newTags);
    }
  };

  return (
    <>
      <button
        className="btn m-auto w-1/2 bg-primary text-white hover:bg-neutral"
        onClick={() => window.review_modal.showModal()}
      >
        <PlusCircle /> Comment
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
            {/*TAG SELECTOR*/}
            <Select
              isMulti
              options={tagslist.map((tag) => ({
                value: tag.id,
                label: tag.name,
              }))}
              onChange={handleTagChange}
              className="max-h-24 w-full max-w-xs text-black"
              placeholder="Type a flavor"
            />

            {/* Selected TAG DISPLAY CHECK */}
            <div className="my-2 flex flex-row items-center justify-center gap-4">
              {selectedTags
                ? selectedTags.map((tag) => <Tag key={tag.id} tag={tag} />)
                : null}
            </div>

            <div className="modal-action">
              <div onClick={() => handleSubmit()} className="btn-primary btn">
                Submit
              </div>
            </div>
          </form>
        </div>
      </dialog>
      {mutation.isLoading && (
        <div className="alert alert-info m-auto w-3/4">
          <CircleEllipsis />
          Posting...
        </div>
      )}
      {mutation.isSuccess && (
        <div className="alert alert-success m-auto w-3/4">
          <CheckCircle />
          Success!
        </div>
      )}
      {mutation.error && (
        <div className="alert alert-error m-auto w-3/4">
          {" "}
          <XCircle /> You must be logged in to post a comment!
        </div>
      )}
    </>
  );
}
