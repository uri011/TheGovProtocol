import React, { useContext } from 'react';

// Contexts
import { GovernanceContext } from '../context/GovernanceContext';
import { ViewStateContext } from '../context/ViewStateContext';

// Components
import { Loader } from ".";


const ActiveCensusItem = ({ title, classprops }) => (
    <li className={`mx-4 mb-1 ${classprops}`}>{title}</li>
);

const VoteDelegate = () => {

    const { handleDelgationChange,
        submitDelegation,
        delegatee,
        auxID,
        activeCensus,
        isLoading,
        inputRef } = useContext(GovernanceContext);

    const { viewDV, handleViewDV } = useContext(ViewStateContext);

    const handleDelegation = (e) => {
        if (!auxID) return;
        submitDelegation();
    };

    return (
        <div>
            <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-votedelegate">
                <div className="flex justify-center text-center">
                    <div>
                        <button
                            type="button"
                            onClick={handleViewDV}
                            className="text-white w-full mt-1 mb-5 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer blue-glassmorphism"
                        >
                            View Delegate Vote Section
                        </button>
                    </div>
                </div>
                {viewDV && (
                    <div>
                        <div className="text-white text-base text-center font-medium">
                            <p>Votes Delegated To - {delegatee} -</p>
                        </div>
                        <div className="flex justify-center text-center">
                            <div className="p-5 mt-5 mb-10 sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
                                <input type="text" name="id" placeholder="Enter Delegation ID" ref={inputRef} onChange={handleDelgationChange} className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-center border-none text-sm white-glassmorphism" />
                                <div className="h-[1px] w-full bg-gray-400 my-2" />
                                {isLoading
                                    ? <Loader />
                                    : (
                                        <button
                                            type="button"
                                            onClick={handleDelegation}
                                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                        >
                                            Submit Delegation
                                        </button>
                                    )}
                            </div>
                        </div>
                        <div>
                            <div className="text-white text-base text-center font-medium">
                                <p className="mb-3 mt-1">Active Census IDs</p>
                            </div>
                            <div className="flex justify-center text-center">
                                <div className="p-5 mt-1 mb-10 flex flex-col justify-center items-center blue-glassmorphism">
                                    <div className="font-bold text-white text-sm">
                                        {activeCensus.map((item, index) => (
                                            <ActiveCensusItem key={item + index} title={item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoteDelegate;