// /components/Card.tsx
import React from "react";
import Image from "next/image";
import Tag from "@/components/tag";
import Link from "next/link";
import { type StrainWithRelations } from "@/server/database/strains";
import { type ProducerWithRelations } from "@/server/database/producers";

type CardProps = {
  data: StrainWithRelations | ProducerWithRelations;
};

const Card: React.FC<CardProps> = ({ data }) => {
  if ("THC" in data) {
    // data is of type Strain
    return (
      <Link href={`/strain/${data.id}`}>
        <div className="card flex h-64 w-64 flex-col overflow-hidden bg-base-100 shadow-lg shadow-gray-100/5 transition-all hover:-translate-y-2 hover:bg-secondary md:w-96">
          {data.image && (
            <Image
              className="h-48 w-full overflow-hidden object-cover object-center"
              src={data.image}
              width={400}
              height={200}
              alt={"image of " + data.name}
            />
          )}
          <div className="badge badge-info absolute right-3 top-3 mb-2 uppercase">
            {data.productType}
          </div>
          <div className="flex flex-col justify-between px-4 py-2">
            <p className="mb-2 text-2xl font-medium">{data.name}</p>
            <div className="my-2 flex flex-row gap-4">
              {data.TerpTags?.map((tag) => {
                return <Tag tag={tag} key={tag.id} />;
              })}
            </div>
            <p className="text-gray-500">{Math.floor(data.THC * 100)}% THC</p>
          </div>
          <div className="absolute bottom-5 right-5">
            <button className="btn-primary btn text-xl">💬</button>
          </div>
        </div>
      </Link>
    );
  } else if ("bannerImage" in data) {
    // data is of type Producer
    return (
      <Link href={`/producer/${data.id}`}>
        <div className="card flex h-56 w-64 flex-col overflow-hidden bg-base-100 shadow-lg shadow-gray-100/5 transition-all hover:-translate-y-2 hover:bg-secondary md:w-96">
          {data.bannerImage && (
            <Image
              className="h-48 w-full overflow-hidden object-cover object-center"
              src={data.bannerImage}
              width={400}
              height={200}
              alt={"image of " + data.name}
            />
          )}
          <div className="flex flex-col justify-between px-4 py-2">
            <p className="mb-2 text-2xl font-medium">{data.name}</p>
            <p className="text-gray-500">{data.location}</p>
          </div>
          <div className="absolute bottom-5 right-5">
            <button className="text-md btn-primary btn uppercase">
              See drops
            </button>
          </div>
        </div>
      </Link>
    );
  } else {
    return <div>Unknown data type</div>;
  }
};

export default Card;
