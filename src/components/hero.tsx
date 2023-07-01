
export type HeroProps = {
  title: string;
  description: string;
  link: string;
};

export default function Hero({ title, description }: HeroProps) {
  return (
    <div className="bg-base-20 my-10">
      <div className="text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="pt-6">{description}</p>
        </div>
      </div>
    </div>
  );
}
