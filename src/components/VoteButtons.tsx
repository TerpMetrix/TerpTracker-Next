import { ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useState } from "react";
import { XCircle } from "lucide-react";

type VoteButtonProps = {
  strainId: number;
  totalVotes: number;
};

export const VoteButtons: React.FC<VoteButtonProps> = ({
  strainId,
  totalVotes,
}) => {
  // use local storage to keep track if a user has voted on a strain
  // if they have, disable the buttons
  // if they haven't, enable the buttons

  const { data: session } = useSession();
  const profileName = session?.user.name || "";
  const mutation = api.votes.newVote.useMutation();
  const updateMutation = api.votes.updateVote.useMutation();
  const deleteMutation = api.votes.deleteVote.useMutation();
  const [vote, setVote] = useState(totalVotes);
  const [currentVote, setCurrentVote] = useState(0); // 1 = upvote, -1 = downvote, 0 = no vote

  //check if user has voted either up or down on this strain and set either the up or down vote button as clicked
  const checkIfVoted = () => {
    api.votes.checkIfVoted.useQuery(
      { strainId: strainId, profileName: profileName },
      {
        onSuccess: (data) => {
          if (data) {
            if (data.value === 1) {
              setCurrentVote(1);
            } else if (data.value === -1) {
              setCurrentVote(-1);
            }
          }
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  checkIfVoted();

  const upvote = () => {
    mutation.mutate(
      { strainId: strainId, profileName: profileName, vote: 1 },
      {
        onSuccess: () => {
          setVote(vote + 1);
          setCurrentVote(1);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const downvote = () => {
    mutation.mutate(
      { strainId: strainId, profileName: profileName, vote: -1 },
      {
        onSuccess: () => {
          setVote(vote - 1);
          setCurrentVote(-1);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  let updatedFlag = false;

  const updateVote = (updateVote: number) => () => {
    //update states

    // if vote is equal to -1 and downvoted, then delete vote and vice versa

    let deleteFlag = false;
    updatedFlag = !updatedFlag;

    if (
      (updateVote === 1 && currentVote === -1) ||
      (updateVote === -1 && currentVote === 1)
    ) {
      deleteFlag = false;
    } else {
      deleteFlag = true;
    }

    if (!deleteFlag) {
      updateMutation.mutate(
        { strainId: strainId, profileName: profileName, vote: updateVote },
        {
          onSuccess: () => {
            updateVote === 1 ? setVote(vote + 2) : setVote(vote - 2);
            setCurrentVote(updateVote);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    } else {
      deleteMutation.mutate(
        { strainId: strainId, profileName: profileName },
        {
          onSuccess: () => {
            if (!updatedFlag) {
              updateVote === 1 ? setVote(vote + 1) : setVote(vote - 1);
            } else {
              updateVote === 1 ? setVote(vote - 1) : setVote(vote + 1);
            }
            setCurrentVote(0);
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    }
  };

  return (
    <>
      <div className="absolute right-4 top-4 my-auto flex w-12 flex-col items-center gap-2">
        <button
          className={
            currentVote === 1
              ? "btn-primary btn h-auto w-4 text-white"
              : "btn-primary btn-outline btn h-auto w-4 text-white"
          }
          onClick={currentVote !== 0 ? updateVote(1) : upvote}
        >
          {currentVote === 1 ? (
            <div className="px-auto flex flex-col items-center pb-1 tracking-tighter">
              <ChevronUp />
              <p className="tracking-tight">🔥</p>
            </div>
          ) : (
            <div className="px-auto flex flex-col items-center pb-1 tracking-tighter">
              <ChevronUp />
              <p className="tracking-tight grayscale">🔥</p>
            </div>
          )}
        </button>
        <p className="text-white">{vote}</p>
        <button
          className={
            currentVote === -1
              ? "btn-error btn h-auto w-4 text-white"
              : "btn-outline btn-error btn h-auto w-4 text-white"
          }
          onClick={currentVote !== 0 ? updateVote(-1) : downvote}
        >
          {currentVote === -1 ? (
            <div className="px-auto flex flex-col items-center pt-3 tracking-tighter">
              <p>🗑️</p>
              <ChevronDown />
            </div>
          ) : (
            <div className="px-auto flex flex-col items-center pt-3 tracking-tighter">
              <p className="grayscale">🗑️</p>
              <ChevronDown />
            </div>
          )}
        </button>
      </div>
      {/* show then hide the element after a few seconds */}

      {mutation.error && (
        <div
          className="alert alert-error m-auto mt-4 flex w-3/4 flex-row"
          role="alert"
        >
          {" "}
          <XCircle /> You must be logged in to vote!
        </div>
      )}
    </>
  );
};
