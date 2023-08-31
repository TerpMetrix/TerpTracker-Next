import React from "react";

interface CarouselProps<TData> {
  title: string;
  data: Array<TData>;
  renderItem: (datum: TData) => React.ReactElement;
  getKey: (datum: TData) => string;
  className?: string;
}

const Carousel = <TData,>({
  title,
  data,
  getKey,
  renderItem,
  className,
}: CarouselProps<TData>) => {
  return (
    <div
      className={`w-full flex-col space-y-2 overflow-hidden ${className ?? ""}`}
    >
      <h1 className="ml-5 w-full text-left text-2xl font-bold text-slate-100 md:ml-10">
        {title}
      </h1>
      <ul className="scroll- mb-2 flex snap-x snap-mandatory scroll-pl-14 gap-0 overflow-x-auto motion-safe:scroll-smooth md:gap-6">
        {data.map((item) => (
          <li
            id={getKey(item)}
            key={getKey(item)}
            className="m-5 shrink-0 snap-start snap-always"
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
