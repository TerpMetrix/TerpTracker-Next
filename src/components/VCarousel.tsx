import React from "react";

interface CarouselProps<TData> {
    title: string;
    data: Array<TData>;
    renderItem: (datum: TData) => React.ReactElement;
    getKey: (datum: TData) => string;
}

const VCarousel = <TData,>({ title, data, getKey, renderItem }: CarouselProps<TData>) => {
    return (
        <div className="w-full flex flex-col space-y-6 overflow-hidden">
            <h1 className="text-2xl font-bold text-left w-full ml-5 md:ml-10">
                {title}
            </h1>
            <ul className="flex flex-col overflow-auto items-center motion-safe:scroll-smooth">
                {data.map(
                    (
                        item,
                    ) => (
                        <li
                            id={getKey(item)}
                            key={getKey(item)}
                            className="shrink-0 w-3/4"
                        >
                            {renderItem(item)}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
}

export default VCarousel;