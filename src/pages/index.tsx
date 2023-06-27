import Head from "next/head";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>TerpTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b pt-[10em] sm:pt-[8em] lg:pt-[8em]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text px-1 tracking-tight text-transparent">
                Terp
              </span>
              Tracker
            </h1>
          </div>
          <div className="flex w-4/5 flex-row items-center gap-1 space-x-2 sm:w-1/2">
            <input
              type="text"
              placeholder="Find what's next in weed"
              className="input-base-content input-bordered input w-full border-white shadow-xl shadow-green-700/10"
            />
            <button className="btn border-0 bg-green-600 shadow-xl shadow-green-700/10 hover:bg-green-700">
              <Search className="w-6 sm:w-full" />
            </button>
          </div>
          <p className="italic">For the state of Colorado only right now!</p>
        </div>
      </main>
    </>
  );
}
