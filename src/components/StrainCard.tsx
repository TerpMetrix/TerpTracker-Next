import { type StrainWithRelations} from "@/server/database/strains";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "@/components/Tag";

type Props = {
    strain : StrainWithRelations
}

const StrainCard: React.FC<Props> = (props) => (
    <Link href={`/strain/${props.strain.id}`}>
        <div className="card flex h-64 w-64 flex-col overflow-hidden bg-base-100 shadow-lg shadow-gray-100/5 transition-all hover:-translate-y-2 hover:bg-secondary md:w-96">
            {props.strain.image && (
                <Image
                    className="h-48 w-full overflow-hidden object-cover object-center"
                    src={props.strain.image}
                    width={400}
                    height={200}
                    alt={"image of " + props.strain.name}
                />
            )}
            <div className="badge badge-info absolute right-3 top-3 mb-2 uppercase">
                {props.strain.productType}
            </div>
            <div className="flex flex-col justify-between px-4 py-2">
                <p className="mb-2 text-2xl font-medium">{props.strain.name}</p>
                <div className="my-2 flex flex-row gap-4">
                    {props.strain.TerpTags?.map((tag) => {
                        return <Tag tag={tag} key={tag.id} />;
                    })}
                </div>
                <p className="text-gray-500">{Math.floor(props.strain.THC * 100)}% THC</p>
            </div>
            <div className="absolute bottom-5 right-5">
                <button className="btn-primary btn text-xl">💬</button>
            </div>
        </div>
    </Link>
);


export default StrainCard;