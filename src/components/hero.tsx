import Link from "next/link";

export type HeroProps = {
  title: string;
  description: string;
  link: string;
  tag: string;
};

export default function Hero({ title, description, tag }: HeroProps) {
  return (
    <div className="hero h-96 bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
          <Link href={tag} scroll={false} className="btn-primary btn">
            Explore Strains
          </Link>
        </div>
      </div>
    </div>
  );
}
