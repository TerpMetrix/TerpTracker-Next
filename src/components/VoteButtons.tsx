import { ChevronDown, ChevronUp } from "lucide-react";
import { api } from "@/utils/api";
import { useState } from "react";

export const VoteButtons = ({ strainId, votes }: { strainId: number, votes: number }) => {

    //use local storage to keep track if a user has voted on a strain
    //if they have, disable the buttons
    //if they haven't, enable the buttons

    if (localStorage.getItem("voted") == "true") {
        return (
            <div className="flex flex-row gap-2">
                <button className="btn bg-primary text-white" disabled>
                    <ChevronUp />
                </button>
                <p className="text-white">{votes}</p>
                <button className="btn bg-primary text-white" disabled>
                    <ChevronDown />
                </button>
            </div>
        );
    }

    const mutation = api.strains.updateStrainVotes.useMutation();
    const [vote, setVote] = useState(votes);

    const upvote = async () => {
        await mutation.mutateAsync({ id: strainId, vote: 1 });
        setVote(vote + 1);
    }

    const downvote = async () => {
        await mutation.mutateAsync({ id: strainId, vote: 2 });
        setVote(vote - 1);
    }

    return (
        <div className="flex flex-row gap-2">
            <button className="btn bg-primary text-white" onClick={upvote}>
                <ChevronUp />
            </button>
            <p className="text-white">{vote}</p>
            <button className="btn bg-primary text-white" onClick={downvote}>
                <ChevronDown />
            </button>
        </div>
    );
};
