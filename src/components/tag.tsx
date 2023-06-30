import React from 'react';
import { Tags } from '@/pages/strain/[id]';

type TagProps = {
    tag: Tags;
};



const Tag: React.FC<TagProps> = ({ tag }) => {

    type ColorClass = {
        [key: string]: string;
    };

    const colorClasses: ColorClass = { // lookup of color classes for purgecss per https://github.com/tailwindlabs/tailwindcss/discussions/3461
        'red': 'bg-red-500',
        'blue': 'bg-blue-500',
        'green': 'bg-green-500',
        'yellow': 'bg-yellow-500',
        'default': 'bg-black',  // default color if no match is found
    };


    const colorClass = colorClasses[tag.color] || colorClasses['default'];

    return (
        <div className={`flex flex-row items-center justify-center space-x-2 p-2 h-5 rounded-xl ${colorClass}`}>
            <div className={`text-sm font-semibold text-white`}>{tag.name}</div>
        </div>
    );
};

export default Tag;
