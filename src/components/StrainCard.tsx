import { type StrainWithRelations } from "@/server/database/strains";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "@/components/Tag";
import { Flower2, Droplets } from "lucide-react";

type Props = {
  strain: StrainWithRelations;
};

const StrainCard: React.FC<Props> = (props) => (
  <Link href={`/strain/${props.strain.id}`}>
    <div className="min-h-96 card flex w-96 flex-col overflow-hidden bg-base-100 shadow-lg shadow-gray-100/5 transition-all hover:-translate-y-2 hover:bg-secondary md:w-72">
      {props.strain.image && (
        <Image
          className="h-full w-full overflow-hidden object-cover object-center"
          src={props.strain.image}
          width={400}
          height={200}
          alt={"image of " + props.strain.name}
        />
      )}
      <div className="badge badge-primary absolute right-3 top-3 h-auto p-1 text-sm font-bold uppercase text-white">
        {
          //func to check if "flower" or "hash" and display flower or hash icon
          props.strain.productType === "flower" ? <Flower2 /> : <Droplets />
        }
      </div>
      {/* votes element */}
      <div className="badge badge-primary absolute left-3 top-3 h-auto p-2 text-lg font-bold text-white">
        {props.strain.votes} {props.strain.votes >= 0 ? <>🔥</> : <>🗑️</>}
      </div>
      <div className="flex flex-col justify-between px-4 py-2">
        <p className="mb-2 text-2xl font-medium">{props.strain.name}</p>
        <p>{props.strain.producer.name}</p>
        <div className="my-2 flex flex-row gap-4">
          {props.strain.terpTags?.map((tag) => {
            return <Tag tag={tag} key={tag.id} />;
          })}
        </div>
      </div>
    </div>
  </Link>
);

export default StrainCard;
