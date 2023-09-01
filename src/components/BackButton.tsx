import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export const BackButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="btn-neutral btn mx-8 uppercase"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
};

export default BackButton;
