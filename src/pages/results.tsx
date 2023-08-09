import { useRouter } from 'next/router';
import {
  getStrainsBySearchTerm,
  type StrainWithRelations,
}
  from '@/server/database/strains';
import {
  convertDatesToStrings,
  convertStringsToDates,
} from "@/utils/dateSerialization";
import { GetServerSideProps } from 'next';
import StrainCard from '@/components/StrainCard';
import Grid from '@/components/Grid';
import Head from 'next/head';

type ResultsPageProps = {
  strains: StrainWithRelations[];
  notFound?: boolean;
};

function ResultsPage({ strains }: ResultsPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  strains = convertDatesToStrings(strains);
  const router = useRouter();
  const { search } = router.query;

  return (
    <>
    <Head>
      <title>Results for "{search}" | TerpTracker</title>
    </Head>
    <div>
      <Grid 
        title={`Results for "${search}"`}
        data={strains}
        renderItem={(strain) => <StrainCard strain={strain} />}
        getKey={(strain) => strain.name}
      />
    </div>
    </>
  );
}

export default ResultsPage;

export const getServerSideProps: GetServerSideProps<ResultsPageProps> = async (
  context
) => {
  //get serach term
  const search = context.query.search;

  if (!search) {
    return {
      notFound: true,
    };
  }

  //get strains by search term
  let strains = await getStrainsBySearchTerm(search.toString());
  console.log(strains);
  strains = convertStringsToDates(strains);

  return {
    props: {
      strains,
    },
  };
}


