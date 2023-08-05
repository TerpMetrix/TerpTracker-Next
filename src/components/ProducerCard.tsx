// /components/Card.tsx
import React from "react";
import type { Strain, Producer } from "@/server/database/types";
import Image from "next/image";
import Tag from "@/components/tag";
import Link from "next/link";

type ProducerCardProps = {
  producer: Producer;
};

const ProducerCard: React.FC<ProducerCardProps> = ({ producer }) => {
  return (
    <Link href={`/producer/${producer.id}`}>
      <div className="card flex h-56 w-64 flex-col overflow-hidden bg-base-100 shadow-lg shadow-gray-100/5 transition-all hover:-translate-y-2 hover:bg-secondary md:w-96">
        {producer.bannerImage && (
          <Image
            className="h-48 w-full overflow-hidden object-cover object-center"
            src={producer.bannerImage}
            width={400}
            height={200}
            alt={"image of " + producer.name}
          />
        )}
        <div className="flex flex-col justify-between px-4 py-2">
          <p className="mb-2 text-2xl font-medium">{producer.name}</p>
          <p className="text-gray-500">{producer.location}</p>
        </div>
        <div className="absolute bottom-5 right-5">
          <button className="text-md btn-primary btn uppercase">
            See drops
          </button>
        </div>
      </div>
    </Link>
  );
};
