import React, { useContext } from "react";
import Select from 'react-select';

// Contexts
import { GovernanceContext } from "../context/GovernanceContext";
import { LogInContext } from "../context/LogInContext";

// Components
import { Loader } from ".";

// Tools
import { getTime, shortenAddress } from "../tools/FormatTools";


const voteOptions = ['For', 'Against', 'Abstain'];

const states = {
    0: 'Pending',
    1: 'Active Vote',
    2: 'Defeated',
    3: 'Succeed',
    4: 'Quorum Not Reached'
};

const ProposalCard = ({ id, state, description,
    creationBlock, snapshotBlock, endBlock, totalVotes,
    forVotes, againstVotes, abstainVotes, votingPower, hasVoted }) => {

    const { logInID } = useContext(LogInContext);
    const { block, isLoading, delegatee, handleSelect, castVote } = useContext(GovernanceContext);

    const status = states[state] ?? 'Invalid State';

    const participationPercent = ((forVotes + againstVotes + abstainVotes) / totalVotes) * 100;

    const handleVote = (e) => {
        castVote(id);
    };

    return (
        <div className="bg-[#181918] m-4 flex flex-1
            2xl:min-w-[850px] 2xl:max-w-[950px]
            sm:min-w-[600px] sm:max-w-[650px]
            min-w-full
            flex-col p-3 rounded-md hover:shadow-2xl"
        >

            <div>
                <div className="flex-auto justify-center">
                    <div className="flex w-full justify-center bg-[#90c4ff] w-2/5 p-3 rounded-md font-bold">{shortenAddress(id)} - {status}</div>
                </div>
            </div>

            <p className="flex w-full justify-center mt-3 mb-6 p-2 text-white text-base">{description}</p>

            <div className="w-full h-[0.25px] bg-gray-400 mt-3 mb-3" />

            <div className="flex justify-center w-full mb-1 p-2">
                <p className="mb-3 mr-11 text-white text-base text-center">Creation Block <br /> {creationBlock}</p>
                <p className="mb-3 mr-11 text-white text-base text-center">Snapshot Block <br /> {snapshotBlock}</p>
                <p className="mb-3 mr-11 text-white text-base text-center">End Block <br /> {endBlock}</p>
                <p className="mb-3 text-white text-base text-center">Current Block <br /> {block}</p>
            </div>

            {(state == 1) && (
                <div className="flex justify-center w-full p-2">
                    <p className="mb-3 mr-11 text-white text-base text-center">Current Phase Estimated Remaining Time <br /> (~12s per block)<br /> {getTime(block, endBlock)}</p>
                </div>
            )}

            <div className="w-full h-[0.25px] bg-gray-400 mt-3 mb-3" />

            <div className="flex justify-center w-full mb-1 p-2">
                <p className="mb-3 mr-11 text-white text-base text-center">Votes Total <br /> {totalVotes}</p>
                <p className="mb-3 mr-11 text-white text-base text-center">Votes For <br /> {forVotes}</p>
                <p className="mb-3 mr-11 text-white text-base text-center">Against Votes <br /> {againstVotes}</p>
                <p className="mb-3 text-white text-base text-center">Abstain Votes <br /> {abstainVotes}</p>
            </div>
            <div className="flex justify-center w-full p-2">
                <p className="mb-3 mr-11 text-white text-base text-center">Participation - {participationPercent} %</p>
            </div>

            <div className="w-full h-[0.25px] bg-gray-400 mt-3 mb-3" />

            <div className="flex justify-center w-full mb-1 p-2">
                <p className="mr-11 text-white text-base text-center">Voting Power - {votingPower}</p>
                {/* {(delegatedID != '') && (<p className="mb-3 mr-11 text-white text-base text-center">Vote Delegated To - {delegatedID} -</p>)} */}
            </div>

            {(state == 1) && (delegatee == logInID) && (!hasVoted) && (
                <div>
                    <div className="w-full h-[0.25px] bg-gray-400 mt-3 mb-3" />

                    <p className="w-full justify-center text-center mb-5 mt-5 text-white font-bold text-base text-lg">
                        Vote Submission
                    </p>
                    < Select
                        className="flex justify-center font-bold text-base mb-5 text-center"
                        defaultValue={{ label: 'Select Option', value: 'empty' }}
                        options={voteOptions.map(id => ({ label: id, value: id }))}
                        onChange={handleSelect} />
                    <div className="h-[1px] w-full bg-gray-400 my-2" />
                    {isLoading
                        ? <Loader />
                        : (
                            <button
                                type="button"
                                onClick={handleVote}
                                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                            >
                                Submit Vote
                            </button>
                        )}
                </div>
            )}
        </div>
    );
};

const Proposals = () => {

    const { proposals } = useContext(GovernanceContext);

    return (
        <div>
            <div className="flex flex-1 justify-start flex-col md:mr-10 mt-10">
                <h1 className="text-center text-3xl sm:text-5xl text-white text-gradient py-5">
                    The Proposals
                </h1>
            </div>
            <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-proposals">
                <div className="flex flex-col md:p-12 py-12 px-4">
                    <div className="flex flex-wrap justify-center items-center">
                        {proposals.reverse().map((proposal, i) => (
                            <ProposalCard key={i} {...proposal} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proposals;