import React from "react";

interface GridProps<TData> {
  title: string;
  data: Array<TData>;
  renderItem: (datum: TData) => React.ReactElement;
}

const Grid = <TData,>({
  title,
  data,
  renderItem,
}: GridProps<TData>) => {
  return (
    //grid layout
    <div className="w-full flex-col space-y-8 overflow-hidden">
      <h2 className="mb-2 ml-5 w-full text-left text-2xl font-bold md:ml-10">
        {title}
      </h2>{" "}
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, iterator) => (
          <div
            key={iterator}
            className="m-5 shrink-0 snap-start snap-always"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
