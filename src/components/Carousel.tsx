// /components/Carousel.tsx
import React from "react";
import Card from "./Card";
import { type StrainWithRelations } from "@/server/database/strains";
import { type ProducerWithRelations } from "@/server/database/producers";

interface CarouselProps {
  title: string;
  data: StrainWithRelations[] | ProducerWithRelations[];
}

export const getItemId = (carouselName: string, index: number) =>
  `${carouselName}-item-${index}`;

const Carousel: React.FC<CarouselProps> = ({ title, data }) => {
  return (
    <>
      <h2 className="mb-2 ml-5 w-full text-left text-2xl font-bold md:ml-24">
        {title}
      </h2>
      <ul className="scroll- mb-2 flex snap-x snap-mandatory scroll-pl-14 gap-0 overflow-x-auto motion-safe:scroll-smooth md:gap-6">
        {data.map(
          (
            item: StrainWithRelations | ProducerWithRelations,
            index: number
          ) => (
            <li
              id={getItemId(title, index)}
              key={index}
              className="m-5 shrink-0 snap-start snap-always"
            >
              <Card data={item} key={index} />
            </li>
          )
        )}
      </ul>
    </>
  );
};

export default Carousel;
