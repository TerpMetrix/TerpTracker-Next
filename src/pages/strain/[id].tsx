import { useRouter } from "next/router";

export default function Strain() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Looking up strain: {id}</div>;
}
