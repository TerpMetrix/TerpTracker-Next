import Link from "next/link";
import { Globe, Instagram } from "lucide-react";

export type HeroProps = {
  title: string;
  instagram?: string;
  link: string;
};

export default function Hero({ title, instagram, link }: HeroProps) {
  return (
    <div className="bg-base-20">
      <div className="text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <div className="my-4 flex w-full flex-row items-center justify-center gap-8">
            <Link href={link} title={title}>
              <Globe className="text-2xl" />
            </Link>
            <Link
              href={`https://instagram.com/` + instagram ?? ""}
              title={title}
            >
              <Instagram className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
