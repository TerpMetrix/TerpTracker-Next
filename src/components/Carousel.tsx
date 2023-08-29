import React from "react";

interface CarouselProps<TData> {
    title: string;
    data: Array<TData>;
    renderItem: (datum : TData) => React.ReactElement;
    getKey: (datum : TData) => string;
    className?: string;

}

const Carousel = <TData,>({ title, data, getKey, renderItem, className }: CarouselProps<TData>) => {
    return (
        <div className={`w-full flex-col space-y-2 overflow-hidden ${className ? className : ""}`}>
            <h1 className="text-2xl font-bold text-left w-full ml-5 md:ml-10 text-slate-100">
                {title}
            </h1>
            <ul className="flex overflow-x-auto gap-0 snap-x scroll-pl-14 md:gap-6 snap-mandatory mb-2 motion-safe:scroll-smooth scroll-">
                {data.map(
                    (
                        item,
                    ) => (
                        <li
                            id={getKey(item)}
                            key={getKey(item)}
                            className="shrink-0 snap-start snap-always m-5"
                        >
                            {renderItem(item)}
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default Carousel;
