import React from "react";

interface CarouselProps<TData> {
  title?: string;
  data: Array<TData>;
  renderItem: (datum: TData) => React.ReactElement;
  className?: string;
}

const VCarousel = <TData,>({
  title,
  data,
  renderItem,
  className,
}: CarouselProps<TData>) => {
  return (
    <div
      className={`flex flex-col space-y-2 overflow-hidden ${className ?? ""}`}
    >
      {title ? (
        <h1 className="ml-5 w-full text-left text-2xl font-bold text-slate-100 md:ml-10">
          {title}
        </h1>
      ) : (
        <></>
      )}
      <ul className="flex flex-col items-center overflow-auto motion-safe:scroll-smooth">
        {data.map((item, index) => (
          <li key={index} className="w-full shrink-0">
            {renderItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VCarousel;
