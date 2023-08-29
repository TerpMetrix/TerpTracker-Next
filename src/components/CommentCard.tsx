import { ReviewWithRelations } from "@/server/database/reviews";
import Tag from "@/components/Tag";
import Link from "next/link";

type Props = {
    review: ReviewWithRelations;
};

const CommentCard: React.FC<Props> = (props) => (
    <div className="card bordered w-full max-w-3xl mx-auto my-4">
        <div className="card-body">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    {/* link to strain */}
                    <Link href={`/strains/${props.review.strain.name}`}>
                        <p className="text-2xl font-bold text-left w-full">
                            {props.review.strain.name}
                        </p>
                    </Link>
                    <p className="text-lg">{props.review.comment ? props.review.comment : ""}</p>
                    <div className="my-2 flex flex-row gap-4">
                    {props.review.terpTags?.map((tag) => {
                        return <Tag tag={tag} key={tag.id} />;
                    })}
                </div>
                </div>
            </div>
        </div>
    </div>
);

export default CommentCard;
