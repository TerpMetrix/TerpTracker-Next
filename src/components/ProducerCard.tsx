import {type ProducerWithRelations} from "@/server/database/producers";
import React from "react";
import Link from "next/link";
import Image from "next/image";


type Props = {
    producer: ProducerWithRelations
};

const ProducerCard: React.FC<Props> = (props) => (
    <Link href={`/producer/${props.producer.id}`}>
        <div className="card flex h-56 w-64 flex-col overflow-hidden bg-base-100 shadow-lg shadow-gray-100/5 transition-all hover:-translate-y-2 hover:bg-secondary md:w-96">
            {props.producer.bannerImage && (
                <Image
                    className="h-48 w-full overflow-hidden object-cover object-center"
                    src={props.producer.bannerImage}
                    width={400}
                    height={200}
                    alt={"image of " + props.producer.name}
                />
            )}
            <div className="flex flex-col justify-between px-4 py-2">
                <p className="mb-2 text-2xl font-medium">{props.producer.name}</p>
                <p className="text-gray-500">{props.producer.location}</p>
            </div>
            <div className="absolute bottom-5 right-5">
                <button className="text-md btn-primary btn uppercase">
                    See drops
                </button>
            </div>
        </div>
    </Link>
);

export default ProducerCard;
