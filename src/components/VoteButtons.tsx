// import { ChevronDown, ChevronUp } from "lucide-react";
// import { api } from "@/utils/api";
// import { useState } from "react";

// export const VoteButtons = ({ strainId, votes }: { strainId: number, votes: number }) => {

    //use local storage to keep track if a user has voted on a strain
    //if they have, disable the buttons
    //if they haven't, enable the buttons

    // const mutation = api.strains.updateStrainVotes.useMutation();
    // const [vote, setVote] = useState(votes);
    // //block out buttons after voting
    // const [voted, setVoted] = useState(false);

    // const upvote = () => {
    //     mutation.mutate({ id: strainId, vote: 1 }, {
    //       onSuccess: () => {
    //         setVote(vote + 1);
    //         setVoted(true);
    //       },
    //       onError: (error) => {
    //         console.log(error);
    //       }
    //     });
    //   };
      
    //   const downvote = () => {
    //     mutation.mutate({ id: strainId, vote: 2 }, {
    //       onSuccess: () => {
    //         setVote(vote - 1);
    //         setVoted(true);
    //       },
    //       onError: (error) => {
    //         console.log(error);
    //       }
    //     });
    //   };

    // return (
        // <div className="flex flex-row gap-2">
        //     <button className= {voted ? "btn bg-primary text-white cursor-not-allowed" : "btn bg-primary text-white"}
        //         onClick={voted ? undefined : upvote}>
        //         {voted ? <ChevronUp className="text-white opacity-50" /> : <ChevronUp />}
        //     </button>
        //     <p className="text-white">{vote}</p>
        //     <button className= {voted ? "btn bg-primary text-white cursor-not-allowed" : "btn bg-primary text-white"}
        //      onClick={voted ? undefined : downvote}>
        //         {voted ? <ChevronDown className="text-white opacity-50" /> : <ChevronDown />}
        //     </button>
        // </div>
    // );
// };
