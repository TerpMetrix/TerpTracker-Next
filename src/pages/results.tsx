import { useRouter } from 'next/router';

function ResultsPage() {
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