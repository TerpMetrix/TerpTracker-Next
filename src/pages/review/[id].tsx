import { useRouter } from "next/router";

export default function Review() {
  const router = useRouter();
  const { id } = router.query;
  return <div>A review: {id}</div>;
}
