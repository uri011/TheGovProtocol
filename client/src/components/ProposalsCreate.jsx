import React, { useContext } from 'react';

// Contexts
import { GovernanceContext } from '../context/GovernanceContext';
import { ViewStateContext } from '../context/ViewStateContext';

// Components
import { Loader } from ".";


const ProposalsCreate = () => {

    const { handleDescription,
        submitProposal,
        proposalDescription,
        isLoading,
        inputRef } = useContext(GovernanceContext);

    const { viewPC, handleViewPC } = useContext(ViewStateContext);

    const handleProposal = (e) => {
        if (!proposalDescription) return;
        submitProposal();
    };

    return (
        <div>
            <div className="w-full flex md:justify-center justify-between items-center flex-col gradient-bg-votedelegate">
                <div className="flex justify-center text-center">
                    <div>
                        <button
                            type="button"
                            onClick={handleViewPC}
                            className="text-white w-full mb-5 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer blue-glassmorphism"
                        >
                            View Create Proposal Section
                        </button>
                    </div>
                </div>
                {viewPC && (
                    <div>
                        <div className="text-white text-base text-center font-medium">
                            <p className="mb-3">Enter the Proposal Title and Description</p>
                            <p>Note: every character in the title and description <br /> adds up cost to create proposal</p>
                        </div>
                        <div className="flex justify-center text-center">
                            <div className="p-5 mt-5 mb-10 sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
                                <input type="text" name="description" placeholder="Proposal Description" ref={inputRef} onChange={handleDescription} className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-center border-none text-sm white-glassmorphism" />
                                <div className="h-[1px] w-full bg-gray-400 my-2" />
                                {isLoading
                                    ? <Loader />
                                    : (
                                        <button
                                            type="button"
                                            onClick={handleProposal}
                                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                        >
                                            Submit Proposal
                                        </button>
                                    )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProposalsCreate;