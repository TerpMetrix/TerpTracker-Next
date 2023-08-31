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
      <div
        className={`card mx-auto my-4 w-full max-w-3xl border-2 ${
          props.className ? props.className : ""
        }`}
      >
        <div className="card-body p-1 px-4 md:p-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              {/* link to strain */}
              <p className="italic">commented on</p>
              <Link href={`/strain/${props.review.strain.id}`}>
                <p className="w-full text-left text-2xl font-bold text-primary">
                  {props.review.strain.name}
                </p>
              </Link>

              {props.review.comment ? (
                <div className="mt-4 flex flex-row items-center">
                  <Image
                    className="h-[50px] w-[50px] rounded-full"
                    src={props.review.profile.user.image ?? ""}
                    width={50}
                    height={50}
                    alt="profile image"
                  />
                  <p className="py-2 pl-4 text-lg">
                    {props.review.comment ? props.review.comment : ""}
                  </p>
                </div>
              ) : (
                <></>
              )}

              <div className="mb-4 mt-4 flex flex-row gap-4 md:mb-0">
                {props.review.terpTags?.map((tag) => {
                  return <Tag tag={tag} key={tag.id} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.forStrain) {
    return (
      <div className="card my-2 w-full border-2">
        <div className="card-body p-1 md:p-5">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <Link
                href={`/profile/${
                  props.review.profile.user.name
                    ? props.review.profile.user.name
                    : ""
                }`}
              >
                <Image
                  className="h-[60px] w-[60px] rounded-full"
                  src={props.review.profile.user.image ?? ""}
                  width={50}
                  height={50}
                  alt="profile image"
                />
              </Link>
              <div className="ml-4 flex flex-col">
                <Link
                  href={`/profile/${
                    props.review.profile.user.name
                      ? props.review.profile.user.name
                      : ""
                  }`}
                >
                  <p className="w-full text-left text-xl font-bold text-primary">
                    {props.review.profileName}
                  </p>
                </Link>
                {props.review.comment ? (
                  <p className="py-2 text-lg">
                    {props.review.comment ? props.review.comment : ""}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="absolute bottom-2 right-2">
              <div className="mb-4 mt-4 flex flex-row gap-4 md:mb-0">
                {props.review.terpTags?.map((tag) => {
                  return <Tag tag={tag} key={tag.id} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CommentCard;
