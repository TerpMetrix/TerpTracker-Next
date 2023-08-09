import React from "react";

interface GridProps<TData> {
    title: string;
    data: Array<TData>;
    renderItem: (datum: TData) => React.ReactElement;
    getKey: (datum: TData) => string;
}

const Grid = <TData,>({ title, data, getKey, renderItem }: GridProps<TData>) => {
    return (
        //grid layout
        <div className="w-full flex-col space-y-8 overflow-hidden">
            <h2 className="text-2xl font-bold mb-2 text-left w-full ml-5 md:ml-10">
                {title}
            </h2>    <div className="grid grid-cols-3 gap-4">
                {data.map(
                    (
                        item,
                    ) => (
                        <div
                            id={getKey(item)}
                            key={getKey(item)}
                            className="shrink-0 snap-start snap-always m-5"
                        >
                            {renderItem(item)}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Grid;

