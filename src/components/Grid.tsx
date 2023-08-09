import React from "react";

interface GridProps<TData> {
    title: string;
    data: Array<TData>;
    renderItem: (datum : TData) => React.ReactElement;
    getKey: (datum : TData) => string;
}

const Grid = <TData,>({ title, data, getKey, renderItem }: GridProps<TData>) => {
    return (
       //grid layout
    <div className="grid grid-cols-3 gap-4">
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
    </div>
    );
}

export default Grid;

