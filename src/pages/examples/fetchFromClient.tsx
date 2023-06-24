import { api } from "@/utils/api";

export default function FetchFromClient() {
  const exampleQuery = api.example.getExample.useQuery({
    name: "Example",
  });

  if (exampleQuery.isLoading) {
    return <div>Loading your example...</div>;
  }

  if (exampleQuery.isError) {
    return <div>Something went wrong</div>;
  }

  if (!exampleQuery.data) {
    return <div>Example not found</div>;
  }

  return (
    <div>
      <h1>{exampleQuery.data.name}</h1>
      <p>{exampleQuery.data.message}</p>
      <p>Created at: {exampleQuery.data.createdAt?.toString()}</p>
      <p>Updated at: {exampleQuery.data.updatedAt?.toString()}</p>
    </div>
  );
}
