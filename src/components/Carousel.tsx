import React from "react";

interface CarouselProps<TData> {
    title: string;
    data: Array<TData>;
    renderItem: (datum : TData) => React.ReactElement;
    getKey: (datum : TData) => string;

}
const Carousel = <TData,>({ title, data, getKey, renderItem }: CarouselProps<TData>) => {
    return (
        <>
            <h2 className="mb-2 ml-5 w-full text-left text-2xl font-bold md:ml-24">
                {title}
            </h2>
            <ul className="scroll- mb-2 flex snap-x snap-mandatory scroll-pl-14 gap-0 overflow-x-auto motion-safe:scroll-smooth md:gap-6">
                {data.map(
                    (
                        item,
                    ) => (
                        <li
                            id={getKey(item)}
                            key={getKey(item)}
                            className="m-5 shrink-0 snap-start snap-always"
                        >
                            {renderItem(item)}
                        </li>
                    )
                )}
            </ul>
        </>
    );
};

export default Carousel;
