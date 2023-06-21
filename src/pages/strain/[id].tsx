import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Strain } from "@prisma/client";
import { prisma } from "@/server/db";

// The props this component receives from getServerSideProps
export type StrainProps = {
  strain: Strain;
  baseURL?: string;
  notFound?: boolean;
};

export default function Producer({ strain, baseURL }: StrainProps) {
  return (
    <div>
      <p>{strain.THC}</p>
      <p>{strain.batchDate}</p>
      <a href={baseURL + "/producer/" + strain.id}>{strain.name}</a>
      <p>{strain.productType}</p>
    </div>
  );
}

// A type for this pages url params
type Params = {
  id: string;
};

// getServerSideProps only runs on the server.
// It will never run on the client.
// That means we can safely make calls to our database here.
// That data is then passed to the component as props.
export const getServerSideProps: GetServerSideProps<StrainProps> = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params as Params;
  const parsedId = parseInt(id as string, 10); // Parse id as an integer
  if (isNaN(parsedId)) {
    return {
      notFound: true,
    };
  }
  const strain = await prisma.strain.findUnique({
    where: {
      id: parsedId,
    },
  });

  if (!strain) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      baseURL: getBaseUrl(context),
      strain: {
        id: strain.id,
        name: strain.name,
        batchDate: strain.batchDate.toString(),
        THC: strain.THC,
        productType: strain.productType,
        producerId: strain.producerId,
      },
    },
  };
};

function getBaseUrl(context: GetServerSidePropsContext) {
  const { req } = context;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  return `${protocol}://${host}`;
}
