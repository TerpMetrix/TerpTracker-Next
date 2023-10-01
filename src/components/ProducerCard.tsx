import { type ProducerWithRelations } from "@/server/database/producers";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

type Props = {
  producer: ProducerWithRelations;
};

const ProducerCard: React.FC<Props> = (props) => {
  const totalVotes = useMemo(
    () => props.producer.strains.reduce((acc, strain) => acc + strain.votes, 0), // your expensive code to run once
    [props.producer.strains] // The dependency that, when changes, triggers your code to update
  );

  return (
    <Link href={`/producer/${props.producer.id}`}>
      <div className="card flex min-h-full w-56 flex-col overflow-hidden bg-base-100 shadow-lg shadow-gray-100/5 transition-all hover:-translate-y-2 hover:bg-secondary md:w-72">
        {props.producer.bannerImage && (
          <Image
            className="h-full w-full overflow-hidden object-cover object-center"
            src={props.producer.bannerImage}
            width={400}
            height={400}
            alt={"image of " + props.producer.name}
          />
        )}
        <div className="badge badge-primary absolute left-3 top-3 h-auto p-2 text-lg font-bold text-white">
          {totalVotes} {totalVotes >= 0 ? <>🔥</> : <>🗑️</>}
        </div>
        <div className="flex flex-col justify-between px-4 py-2">
          <p className="mb-2 text-2xl font-medium">{props.producer.name}</p>
          <p className="text-gray-500">{props.producer.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProducerCard;
