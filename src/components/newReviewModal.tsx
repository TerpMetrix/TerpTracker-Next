import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

declare global {
  interface Window {
    my_modal_1: HTMLDialogElement;
  }
}

export default function NewReviewModal() {
  const { data: sessionData } = useSession();

  const mutation = api.reviews.newReview.useMutation();

  const click = () => {
    console.log("clicked");
    const res = mutation.mutate({
      rating: 5,
      comment: "Some good stuff",
      strainId: 4,
      profileId: "clj4os9jf0000yf48jn6pusba",
    });
    console.log(res);
  };

  return (
    <button className="btn" onClick={() => click()}>
      Add Review
    </button>
  );
}
