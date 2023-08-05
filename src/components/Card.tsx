// /components/Card.tsx
import React from 'react';
import type { Strain, Producer } from '@/server/database/types';
import Image from 'next/image';
import Tag from '@/components/tag';
import Link from 'next/link';

type CardProps = {
    data: Strain | Producer;
};

const Card: React.FC<CardProps> = ({ data }) => {
    if ('THC' in data) {
        // data is of type Strain
        return (
            <Link href={`/strain/${data.id}`}>
                <div className="flex flex-col h-64 card w-64 md:w-96 bg-base-100 transition-all hover:-translate-y-2 hover:bg-secondary shadow-lg shadow-gray-100/5 overflow-hidden">
                    {data.image && (<Image
                        className="h-48 w-full overflow-hidden object-cover object-center"
                        src={data.image}
                        width={400}
                        height={200}
                        alt={"image of " + data.name}
                    />)}
                    <div className="badge badge-info mb-2 absolute top-3 right-3 uppercase">{data.productType}</div>
                    <div className="flex flex-col justify-between px-4 py-2">
                        <p className="text-2xl mb-2 font-medium">{data.name}</p>
                        <div className="flex flex-row gap-4 my-2">
                            {data.TerpTags?.map((tag) => {
                                return <Tag tag={tag} key={tag.id} />;
                            })}
                        </div>
                        <p className="text-gray-500">{Math.floor(data.THC * 100)}% THC</p>
                    </div>
                    <div className="absolute bottom-5 right-5">
                        <button className="btn btn-primary text-xl">💬</button>
                    </div>
                </div>
            </Link>
        );
    } else if ('bannerImage' in data) {
        // data is of type Producer
        return (
            <Link href={`/producer/${data.id}`}>
                <div className="flex flex-col h-56 card w-64 md:w-96 bg-base-100 transition-all hover:-translate-y-2 hover:bg-secondary shadow-lg shadow-gray-100/5 overflow-hidden">
                    {data.bannerImage && (
                        <Image
                            className="h-48 w-full overflow-hidden object-cover object-center"
                            src={data.bannerImage}
                            width={400} height={200}
                            alt={"image of " + data.name} />
                    )}
                    <div className="flex flex-col justify-between px-4 py-2">
                        <p className="text-2xl mb-2 font-medium">{data.name}</p>
                        <p className="text-gray-500">{data.location}</p>
                    </div>
                    <div className="absolute bottom-5 right-5">
                        <button className="btn btn-primary text-md uppercase">See drops</button>
                    </div>
                </div>
            </Link>
        );
    } else {
        return <div>Unknown data type</div>;
    }
};

export default Card;
