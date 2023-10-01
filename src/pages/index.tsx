import { ArrowRight } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  const brands = [
    "greendot",
    "snaxland",
    "soiku",
    "dablogic",
    "locol",
    "melody",
    "lazercat",
    "710",
  ];
  return (
    <>
      <Head>
        <title>TerpTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="justify-center text-center">
        <div className="m-auto flex flex-col items-center px-4 pb-6 sm:py-8 text-4xl font-extrabold sm:text-[3.5em]">
          <h1 className="">Upgrade your cannabis with</h1>
          <span className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text py-2 text-5xl text-transparent sm:py-4 sm:text-[1.25em]">
            TerpTracker
          </span>
        </div>
        <Image
          className="m-auto w-11/12 overflow-hidden object-cover object-center sm:w-3/4"
          src="/images/UIMockUp.png"
          width={2302}
          height={1686}
          alt={"image of " + "TerpTracker"}
        />
        <div className="m-auto flex flex-col items-center px-6 py-6 text-[2em] sm:py-12 sm:text-[3rem]">
          <h1 className="text-normal">All of your favorite brands...</h1>
        </div>
        {/* animated rotating carousel of brand images */}
        <div className="inline-flex w-9/12 flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-6">
            {/* map thru brand images */}
            {brands.map((brand) => {
              return (
                <li key={brand} className="">
                  <Image
                    className="w-32 object-cover object-center sm:w-48"
                    src={"/images/" + brand + ".png"}
                    width={200}
                    height={200}
                    alt={"brand img for " + brand}
                  />
                </li>
              );
            })}
          </ul>
          <ul
            className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-6"
            aria-hidden="true"
          >
            {/* map thru brand images */}
            {brands.map((brand) => {
              return (
                <li key={brand} className="">
                  <Image
                    className="w-32 object-cover object-center sm:w-48"
                    src={"/images/" + brand + ".png"}
                    width={200}
                    height={200}
                    alt={"brand img for " + brand}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        {/* FEATURE GRID - 2x2 desktop - 1x4 mobile (card grid for feature descriptions) */}
        {/* <div className="m-auto grid w-3/4 grid-cols-2 gap-4 md:grid-cols-4">
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div> */}
        {/* go to home page button */}
        <div className="m-auto py-12">
          <Link href="/home">
          <button className="btn-primary btn text-white text-xl h-16 w-auto font-light hover:bg-secondary">
            Try The Beta <ArrowRight />
          </button>
          </Link>
        </div>
      </main>
    </>
  );
}
