import { useRouter } from "next/router";

export default function Producer() {
  const router = useRouter();
  const { id } = router.query;
  return <div>Producer: {id}</div>;
}
