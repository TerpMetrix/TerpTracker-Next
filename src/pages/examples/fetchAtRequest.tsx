import { prisma } from "@/server/db";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

// The props of this component.
// We will fetch the values from the database using prisma.
type FetchAtRequestProps = {
  name?: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
  notFound?: boolean;
};

// The component itself.
export default function FetchAtRequest({
  name,
  message,
  createdAt,
  updatedAt,
  notFound,
}: FetchAtRequestProps) {
  if (notFound) {
    return <h1>Not Found</h1>;
  }

  return (
    <div>
      <h1>{name}</h1>
      <p>{message}</p>
      <p>Created at: {createdAt?.toString()}</p>
      <p>Updated at: {updatedAt?.toString()}</p>
    </div>
  );
}

// This runs ever time the page is requested.
// So ever time a user hits this page we will fetch the data from the database.
// If the page is requested often it will end up using more of our database resources.
//
// Another drawback: Page loads will be slower for the user.
// Since we have to wait for a database query to finish BEFORE we ever send any html to the user.
// If the query is simple, it's less of a big deal. But how ever long the query take is how long the user will be waiting.
// If it's a 1 second query. They user wont get any html for at least 1 second.
//
// example url: localhost/examples/fetchAtRequest?name=Example
export const getServerSideProps: GetServerSideProps<
  FetchAtRequestProps
> = async (context: GetServerSidePropsContext) => {
  // The specific example record we want to look up. Or default to "Example".
  const name = context.query.name || "Example";

  try {
    const example = await prisma.example.findFirst({
      where: {
        // Since this runs ever time the page is requested we can allow users to select specific records.
        name: name as string,
      },
    });

    if (!example) {
      return {
        props: {
          name: name as string,
          notFound: true,
        },
      };
    }

    return {
      props: {
        name: example.name,
        message: example.message,
        createdAt: example.createdAt.toJSON(),
        updatedAt: example.updatedAt.toJSON(),
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      name: name as string,
      notFound: true,
    },
  };
};
