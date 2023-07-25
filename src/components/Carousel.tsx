// /components/Carousel.tsx
import React from 'react';
import type { Strain, Producer } from '@/server/database/types';
import Card from './Card';


interface CarouselProps {
    title: string;
    data: Strain[] | Producer[];
}

export const getItemId = (carouselName: string, index: number) =>
    `${carouselName}-item-${index}`

const Carousel: React.FC<CarouselProps> = ({ title, data }) => {
    return (
        <>  
            <h2 className="text-2xl font-bold mb-2 text-left w-full ml-5 md:ml-24">{title}</h2>
            <ul className="flex overflow-x-auto gap-0 snap-x scroll-pl-14 md:gap-6 snap-mandatory mb-2 motion-safe:scroll-smooth scroll-">
                {data.map((item: Strain | Producer, index: number) => (
                    <li
                        id={getItemId(title, index)}
                        key={index}
                        className="shrink-0 snap-start snap-always m-5"
                    >
                        <Card data = {item} key={index} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Carousel;

