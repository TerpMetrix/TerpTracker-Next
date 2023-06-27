import { prisma } from "@/server/db";
import type { GetStaticProps } from "next";

// The props of this component.
// We will fetch the values from the database using prisma.
type FetchAtBuildProps = {
  name: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

// The component itself.
export default function FetchAtBuild({
  name,
  message,
  createdAt,
  updatedAt,
}: FetchAtBuildProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{message}</p>
      <p>Created at: {createdAt.toString()}</p>
      <p>Updated at: {updatedAt.toString()}</p>
    </div>
  );
}

// This runs only once at build time. So the prisma query will only run once.
// So at build time this react component/file will be rendered into html directly.
// When NextJS gets a request to this file path it won't send any react code.
// It will just send the static html that was generated at build time.
//
// This is most useful when we expect the data to be static and not change often.
// It's also the most fastest user experience and most efficient use of our database resources.
// But it's not always possible to use this method.
//
// Build time means when we run "next build". Which is usually done automatically ever push.
export const getStaticProps: GetStaticProps<FetchAtBuildProps> = async () => {
  try {
    const example = await prisma.example.findFirst({
      where: {
        // This static value of "Example" would normally be some user provided search or url param.
        // But again, since this runs at build time. There is no user available to provide this value though.
        name: "Example",
      },
    });

    if (!example) {
      throw new Error("Example not found");
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
    throw error;
  }
};
