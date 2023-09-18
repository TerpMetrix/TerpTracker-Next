import { map } from "@trpc/server/observable";
import Head from "next/head";
import Image from "next/image";

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
        <div className="m-auto flex flex-col items-center px-4 py-5 text-4xl font-extrabold sm:text-[4em]">
          <h1 className="">Upgrade your cannabis with</h1>
          <span className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text py-2 text-5xl sm:text-[1.5em] text-transparent">
            TerpTracker
          </span>
        </div>
        <Image
          className="m-auto w-11/12 sm:w-3/4 overflow-hidden object-cover object-center"
          src="/images/UIMockUp.png"
          width={1000}
          height={500}
          alt={"image of " + "TerpTracker"}
        />
        <div className="m-auto flex flex-col items-center px-6 py-6 sm:py-12 text-[2em] font-extrabold sm:text-[3rem]">
          <h1 className="">All of your favorite brands...</h1>
        </div>
        {/* animated rotating carousel of brand images */}
        <div className="w-9/12 inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll">
            {/* map thru brand images */}
            {brands.map((brand) => {
              return (
                <li key={brand} className="">
                  <Image
                    className="w-32 sm:w-48 object-cover object-center"
                    src={"/images/" + brand + ".png"}
                    width={200}
                    height={200}
                    alt={"brand img for " + brand}
                  />
                </li>
              );
            })}
          </ul>
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-6 [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
            {/* map thru brand images */}
            {brands.map((brand) => {
              return (
                <li key={brand} className="">
                  <Image
                    className="w-32 sm:w-48 object-cover object-center"
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
        {/* 2x2 desktop - 1x4 mobile (card grid for feature descriptions) */}
        <div className="m-auto grid w-3/4 grid-cols-2 gap-4 md:grid-cols-4">
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </main>
    </>
  );
}
