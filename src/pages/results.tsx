import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import StrainCard from "@/components/StrainCard";
import Grid from "@/components/Grid";
import Head from "next/head";
import StrainFilter from "@/components/SearchFilter";
import { api } from "@/utils/api";

function ResultsPage() {
  const router = useRouter();
  const { search } = router.query;
  const searchString = search?.toString() || "";
  const [filters, setFilters] = useState({ search: searchString });

  useEffect(() => {
    setFilters((prevFilters) => ({ ...prevFilters, search: searchString }));
  }, [searchString]);
  
  // Use tRPC hook to fetch strains based on search and filters
  const strainsQuery = api.strains.getStrainsByFilteredSearch.useQuery({...filters });

  const strains = strainsQuery.data || [];

  return (
    <>
      <Head>
        <title>Results for {search} | TerpTracker</title>
      </Head>
      <div className="justify-center flex flex-col">
        <StrainFilter onFilterChange={(newFilters) => setFilters(newFilters)} />
        <Grid
          title={`Results for "${search ? search?.toString() : ""}"`}
          data={strains}
          renderItem={(strain) => <StrainCard strain={strain} />}
        />
      </div>
    </>
  );
}

export default ResultsPage;
