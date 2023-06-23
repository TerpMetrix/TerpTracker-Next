import Head from "next/head";
import { api } from "@/utils/api";
import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "weed" });

  return (
    <>
      <Head>
        <title>TerpTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center lg:pt-[8em] sm:pt-[8em] pt-[10em] bg-gradient-to-b">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-row items-center gap-2">
            {/* <Image
              src={"/terptracker-logo.png"}
              alt="TerpTracker Logo"
              fill
              className="inline" />
            </div> */}
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="px-1 bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text text-transparent tracking-tight">Terp</span>Tracker
            </h1>
          </div>
          <div className="flex flex-row w-4/5 sm:w-1/2 items-center gap-1 space-x-2">
            <input type="text" placeholder={hello.data ? hello.data.greeting : "Loading..."} className="shadow-xl shadow-green-700/10 input input-bordered input-base-content border-white w-full" />
            <button className="btn bg-green-600 shadow-xl shadow-green-700/10 hover:bg-green-700 border-0">
              <Search className="w-6 sm:w-full"/>
            </button>
          </div>
          <p className="italic">For the state of Colorado only right now!</p>
        </div>
      </main>
    </>
  );
}
