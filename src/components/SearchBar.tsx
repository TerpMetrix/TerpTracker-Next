import React, { useState, useCallback } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/router";

type SearchBarProps = {
  initialState?: string;
};

/**
 * Search bar component: searches the entire site for strails & producers
 * @param initialState -- determines initial state of search bar
 */
export const SearchBar = ({ initialState }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialState || "");
  const router = useRouter();

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!searchTerm) {
        return;
      }

      router.push(`/results?search=${searchTerm}`).catch(console.error);
    },
    [searchTerm, router]
  );

  return (
    <div className="w-full">
      <form
        onSubmit={handleSearch}
        className="m-auto flex w-full flex-row gap-1 space-x-2"
      >
        <input
          type="text"
          placeholder={
            initialState?.toString() ?? "Search strains and brands..."
          }
          className="input-base-content input w-full border-white shadow-xl shadow-green-700/10"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn border-0 bg-green-600 shadow-xl shadow-green-700/10 hover:bg-green-700">
          <Search className="w-6 sm:w-full" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
