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

type ResultsPageProps = {
  strains: StrainWithRelations[];
  notFound?: boolean;
};

function ResultsPage({ strains }: ResultsPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  strains = convertStringsToDates(strains);
  const router = useRouter();
  const { search } = router.query;

  return (
    <div>
      <h1>Search Results for "{search}"</h1>
      {/* Display search results */}
    </div>
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


