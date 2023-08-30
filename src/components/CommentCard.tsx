import { type ReviewWithRelations } from "@/server/database/reviews";
import Tag from "@/components/Tag";
import Link from "next/link";
import Image from "next/image";

type Props = {
    review: ReviewWithRelations;
    className?: string;
    forProfile?: boolean;
    forStrain?: boolean;
};

const CommentCard: React.FC<Props> = (props) => {
    if (props.forProfile) {
        return (
            <div className={`card border-2 w-full max-w-3xl mx-auto my-4 ${props.className ? props.className : ""}`}>
                <div className="card-body p-1 px-4 md:p-8">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            {/* link to strain */}
                            <p className="italic">commented on</p>
                            <Link href={`/strain/${props.review.strain.id}`} >
                                <p className="text-2xl font-bold text-left w-full text-primary">
                                    {props.review.strain.name}
                                </p>
                            </Link>

                            {props.review.comment ?
                                <div className="flex flex-row mt-4 items-center">
                                    <Image
                                        className="rounded-full w-[50px] h-[50px]"
                                        src={props.review.profile.user.image ?? ""}
                                        width={50}
                                        height={50}
                                        alt="profile image"
                                    />
                                    <p className="text-lg py-2 pl-4">{props.review.comment ? props.review.comment : ""}</p>
                                </div>
                                : <></>}

                            <div className="flex flex-row mt-4 mb-4 md:mb-0 gap-4">
                                {props.review.terpTags?.map((tag) => {
                                    return (
                                        <Tag tag={tag} key={tag.id} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    else if (props.forStrain) {
        return (
            <div className="card border-2 w-full my-2">
                <div className="card-body p-1 md:p-5">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center">
                            <Link href={`/profile/${props.review.profile.user.name ? props.review.profile.user.name : ""}`} >
                                <Image
                                    className="rounded-full w-[60px] h-[60px]"
                                    src={props.review.profile.user.image ?? ""}
                                    width={50}
                                    height={50}
                                    alt="profile image"
                                />
                            </Link>
                            <div className="flex flex-col ml-4">
                                <Link href={`/profile/${props.review.profile.user.name ? props.review.profile.user.name : ""}`} >
                                    <p className="text-xl font-bold text-left w-full text-primary">
                                        {props.review.profileName}
                                    </p>
                                </Link>
                                {props.review.comment ?
                                    <p className="text-lg py-2">{props.review.comment ? props.review.comment : ""}</p>
                                    : <></>}
                            </div>

                        </div>


                        <div className="absolute bottom-2 right-2">
                            <div className="flex flex-row mt-4 mb-4 md:mb-0 gap-4">
                                {props.review.terpTags?.map((tag) => {
                                    return (
                                        <Tag tag={tag} key={tag.id} />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default CommentCard;
