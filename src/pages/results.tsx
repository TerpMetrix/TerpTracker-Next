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
  const [filters, setFilters] = useState({});

  // Use tRPC hook to fetch strains based on search and filters
  const strainsQuery = api.strains.getStrainsByFilteredSearch.useQuery({ search: search?.toString(), ...filters });

  const strains = strainsQuery.data || [];

  return (
    <>
      <Head>
        <title>Results for {search} | TerpTracker</title>
      </Head>
      <div>
        <StrainFilter onFilterChange={(newFilters) => setFilters(newFilters)} />
        <Grid
          title={`Results for "${search ? search?.toString() : ""}"`}
          data={strains}
          renderItem={(strain) => <StrainCard strain={strain} />}
          getKey={(strain) => strain.name}
        />
      </div>
    </>
  );
}

export default ResultsPage;
