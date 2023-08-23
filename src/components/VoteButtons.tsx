// import { ChevronDown, ChevronUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useState } from "react";
import { XCircle, CheckCircle, CircleEllipsis } from "lucide-react";

export const VoteButtons = ({ strainId, totalVotes }: { strainId: number, totalVotes: number }) => {

  // use local storage to keep track if a user has voted on a strain
  // if they have, disable the buttons
  // if they haven't, enable the buttons

  const { data: session } = useSession();
  const profileName = session?.user.name || "";
  const mutation = api.votes.newVote.useMutation();
  const updateMutation = api.votes.updateVote.useMutation();
  const [vote, setVote] = useState(totalVotes);
  //block out buttons after voting
  const [upvoted, setUpvote] = useState(false);
  const [downvoted, setDownvote] = useState(false);

  //check if user has voted either up or down on this strain and set either the up or down vote button as clicked

  const checkIfVoted = () => {
    api.votes.checkIfVoted.useQuery({ strainId: strainId, profileName: profileName }, {
      onSuccess: (data) => {
        if (data) {
          if (data.value === 1) {
            setUpvote(true);
            setDownvote(false);
          } else if (data.value === -1) {
            setDownvote(true);
            setUpvote(false);
          }
        }
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };

  checkIfVoted();

  const upvote = () => {
    mutation.mutate({ strainId: strainId, profileName: profileName, vote: 1 }, {
      onSuccess: () => {
        setVote(vote + 1);
        setUpvote(true);
        setDownvote(false);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };

  const downvote = () => {
    mutation.mutate({ strainId: strainId, profileName: profileName, vote: -1 }, {
      onSuccess: () => {
        setVote(vote - 1);
        setDownvote(true);
        setUpvote(false);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };

  const updateVote = (vote: number) => () => {
    //update states
    if (vote === 1) {
      setUpvote(true);
      setDownvote(false);
    } else if (vote === -1) {
      setDownvote(true);
      setUpvote(false);
    }

    updateMutation.mutate({ strainId: strainId, profileName: profileName, vote: vote }, {
      onSuccess: () => {
        setVote(vote);
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };


  return (
    <div className="flex flex-row gap-2">
      <button className= { upvoted ? 'btn bg-primary text-white' : 'btn bg-neutral text-white' }
        onClick={upvoted || downvoted ? updateVote(1) : upvote}>
        {upvoted ? <p>🔥</p>: <p className="grayscale">🔥</p>}
      </button>
      <p className="text-white">{vote}</p>
      <button className={ downvoted ? 'btn bg-primary text-white' : 'btn bg-neutral text-white'}
        onClick={downvoted || upvoted ? updateVote(-1) : downvote}>
        {downvoted ? <p>🗑️</p>: <p className="grayscale">🗑️</p>}
      </button>
      {mutation.error && <div className="m-auto alert alert-error w-3/4"> <XCircle /> You must be logged in to vote!</div>}
    </div>
  );

};
