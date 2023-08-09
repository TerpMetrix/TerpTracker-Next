import React from 'react';
import type { TerpTag } from '@prisma/client';

type TagProps = {
    tag: TerpTag;
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
        'brown': 'bg-orange-500',
        'purple': 'bg-purple-500',
        'orange': 'bg-orange-500',
        'pink': 'bg-pink-500',
        'gray': 'bg-gray-500',
        'white': 'bg-white',
        'black': 'bg-black',
        'light green': 'bg-green-300',
        'light blue': 'bg-blue-300',
        'light red': 'bg-red-300',
        'light yellow': 'bg-yellow-300',
        'light brown': 'bg-orange-300',
        'light purple': 'bg-purple-300',
        'light orange': 'bg-orange-300',
        'light pink': 'bg-pink-300',
        'default': 'bg-black',  // default color if no match is found
    };

    const colorClass = colorClasses[tag.color] || colorClasses['default'];

    return (
        <div className={`flex flex-row items-center justify-center space-x-2 p-2 h-5 rounded-xl ${colorClass ? colorClass : ''}`}>
            <div className={`text-sm font-semibold text-white`}>{tag.name}</div>
        </div>
    );
};

export default Tag;
