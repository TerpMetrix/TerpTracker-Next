import { GetServerSideProps } from "next";
import { prisma } from "@/server/db";

type Strain = {
  id: number;
  name: string;
  batchDate: string;
  productType: string;
  THC: number;
  producerId: number;
};

type StrainsProps = {
  strains: Strain[];
  notFound?: boolean;
};

// Main exported component for Strains page
export default function Strains({ strains }: StrainsProps) {
  return (
    <div>
      {strains.map((strain) => (
        <a key={strain.id} href={"/strain/" + String(strain.id)}>
          <p>{strain.name}</p>
        </a>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  StrainsProps
> = async () => {
  try {
    const strains = await prisma.strain.findMany();

    console.log(strains);

    return {
      props: {
        strains: strains.map((strain) => ({
          id: strain.id,
          name: strain.name,
          batchDate: strain.batchDate.toDateString(),
          productType: strain.productType,
          THC: strain.THC,
          producerId: strain.producerId,
        })),
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};
