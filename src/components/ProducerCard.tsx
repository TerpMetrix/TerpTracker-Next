import {type ProducerWithRelations} from "@/server/database/producers";
import React from "react";
import Link from "next/link";
import Image from "next/image";


type Props = {
    producer: ProducerWithRelations
};

const ProducerCard: React.FC<Props> = (props) => (
    <Link href={`/producer/${props.producer.id}`}>
        <div className="card w-96 md:w-72 min-h-full flex flex-col overflow-hidden bg-base-100 shadow-lg shadow-gray-100/5 transition-all hover:-translate-y-2 hover:bg-secondary">
            {props.producer.bannerImage && (
                <Image
                    className="h-full w-full overflow-hidden object-cover object-center"
                    src={props.producer.bannerImage}
                    width={400}
                    height={400}
                    alt={"image of " + props.producer.name}
                />
            )}
            <div className="flex flex-col justify-between px-4 py-2">
                <p className="mb-2 text-2xl font-medium">{props.producer.name}</p>
                <p className="text-gray-500">{props.producer.location}</p>
            </div>
        </div>
    </Link>
);

export default ProducerCard;
