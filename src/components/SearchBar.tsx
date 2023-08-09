import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/router";

type SearchBarProps = {
    initialState?: string;
}

//accept input argument that determines initial state of search bar
export const SearchBar = ({ initialState }: SearchBarProps) => {
    if (!initialState) {
        initialState = "";
    }
    const [searchTerm, setSearchTerm] = useState(initialState);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/results?search=${searchTerm}`).then(() => {
            // Handle successful navigation
        }).catch((error) => {
            console.error(error);
        });
    };

    return (

        <div className="w-full justify-center">
            <form onSubmit={handleSearch} className="flex flex-row w-full m-auto items-center gap-1 space-x-2 sm:w-1/2 md:px-4">
                <input
                    type="text"
                    placeholder={initialState ? initialState.toString() : "Search strains and brands..."}
                    className="input-base-content input w-full border-white shadow-xl shadow-green-700/10"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn border-0 bg-green-600 shadow-xl shadow-green-700/10 hover:bg-green-700">
                    <Search className="w-6 sm:w-full" />
                </button>
            </form>
        </div>

    );
}

export default SearchBar;