import Head from "next/head";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>TerpTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col items-center justify-center px-20 text-center">
        <h1>
          Upgrade your cannabis with
          <span className="bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text px-1 tracking-tight text-transparent">
            TerpTracker
          </span>
        </h1>
        <p className="mt-3 text-2xl">
          The best place to find the best cannabis
        </p>
        <Image
          className="h-full w-full overflow-hidden object-cover object-center"
          src="/images/UIMockUp.png"
          width={400}
          height={200}
          alt={"image of " + "TerpTracker"}
        />
      </main>
    </div>
  );
}
