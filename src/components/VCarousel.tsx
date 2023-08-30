import React from "react";

interface CarouselProps<TData> {
    title?: string;
    data: Array<TData>;
    renderItem: (datum: TData) => React.ReactElement;
    getKey: (datum: TData) => string;
    className?: string;
}

const VCarousel = <TData,>({ title, data, getKey, renderItem, className }: CarouselProps<TData>) => {
    return (
        <div className={`flex flex-col space-y-2 overflow-hidden ${className ? className : ""}`}>
            {title ?
                <h1 className="text-2xl font-bold text-left w-full ml-5 md:ml-10 text-slate-100">
                    {title}
                </h1>
                :
                <></>
            }
            <ul className="flex flex-col overflow-auto items-center motion-safe:scroll-smooth">
                {data.map(
                    (
                        item,
                    ) => (
                        <li
                            id={getKey(item)}
                            key={getKey(item)}
                            className="shrink-0 w-full"
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