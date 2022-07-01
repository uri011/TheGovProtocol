import React, { useLayoutEffect, useEffect, useState, useContext, useRef } from 'react';
import { ethers } from 'ethers';

// Contexts
import { LogInContext } from './LogInContext';

// Tools
import { idsContract, provider, connected, installed, getActiveCensus, govContract } from '../tools/Web3Tools';
import { formatID } from '../tools/FormatTools';

// Utils
import { deployBlock } from '../utils/constants';


export const GovernanceContext = React.createContext();

const { ethereum } = window;

export const GovernanceProvider = ({ children }) => {

    const { logInID } = useContext(LogInContext);

    const [delegatee, setDelegatee] = useState('');
    const [auxID, setAuxID] = useState('');
    const [proposalTitle, setProposalTitle] = useState('');
    const [proposalDescription, setProposalDescription] = useState('');
    const [activeCensus, setActiveCensus] = useState([]);
    const [block, setBlock] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [updateProposals, setUpdateProposals] = useState(false);
    const [proposals, setProposals] = useState([]);
    const [voteSupport, setVoteSupport] = useState('');

    const inputRef = useRef(null);

    const handleDelgationChange = (e) => {
        setAuxID(e.target.value);
    };

    const handleTitle = (e) => {
        setProposalTitle(e.target.value);
    };

    const handleDescription = (e) => {
        setProposalDescription(e.target.value);
    };

    const handleSelect = (e) => {
        setVoteSupport(e.value);
    }

    const castVote = async (proposalId) => {
        try {
            if (!(connected && installed)) return alert('Account Connection Lost');

            setIsLoading(true);

            let decimalSupport = formatVote(voteSupport);
            let tx = await govContract.castVote(proposalId, decimalSupport, formatID(logInID, true));
            await tx.wait();

            setIsLoading(false);

            setUpdateProposals(!updateProposals);

        } catch (error) {
            console.log(error);
            alert('User Already Voted');
            setIsLoading(false);
        }
    }

    const formatVote = (vote) => {
        switch (vote) {
            case 'For':
                return 1;
            case 'Against':
                return 0;
            case 'Abstain':
                return 2;
            default:
                return;
        }
    }

    // Submits delegation ID to the governance contract
    const submitDelegation = async () => {
        try {
            if (!(connected && installed)) return alert('Account Connection Lost');

            setIsLoading(true);

            checkActiveCensus();

            if (!activeCensus.includes(auxID) && auxID != logInID) return alert('ID Does Not Exist');

            let tx = await idsContract.delegate(formatID(logInID, true), formatID(auxID, true));
            await tx.wait();

            setDelegatee(auxID);

            inputRef.current.value = '';

            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    };

    // Submits the proposalTitle & proposalDescription to the governance contract as a new proposal
    const submitProposal = async () => {
        try {

            if (!(connected && installed)) return alert('Account Connection Lost');

            setIsLoading(true);

            let tx = await govContract.propose(proposalDescription, formatID(logInID, true));
            await tx.wait();

            inputRef.current.value = '';

            setIsLoading(false);

            setUpdateProposals(!updateProposals);

        } catch (error) {
            console.log(error);
            alert('Requirements Not Met');
            setIsLoading(false);
        }
    };

    // Checks and updates delegated address from governance contract
    const checkDelegatedID = async () => {
        try {
            if (!(connected && installed)) return;

            if (logInID != '') {
                const id = await idsContract.delegates(formatID(logInID, true));
                const d = formatID(ethers.BigNumber.from(id).toNumber(), false);
                setDelegatee(d);
            }

        } catch (error) {
            console.log(error);
        }
    };

    // Checks and sets current block number of the provided network
    const checkBlock = async () => {
        try {

            const b = await provider.getBlockNumber();
            setBlock(b);

        } catch (error) {
            console.log(error);
        }
    };

    const checkActiveCensus = async () => {
        try {
            setActiveCensus(await getActiveCensus());
        } catch (error) {
            console.log(error);
        }
    };

    const checkProposals = async () => {
        try {
            if (logInID == '') return;

            const logs = await govContract.queryFilter('ProposalCreated', deployBlock, 'latest')

            let r = [];

            for (let i = 0; i < logs.length; i++) {

                let id = logs[i].args[0];
                let snapshot = ethers.BigNumber.from(logs[i].args[2]).toNumber();
                let endBlock = logs[i].args[3];
                let des = logs[i].args[4];

                let { votingDelay,
                    forVotes,
                    againstVotes,
                    abstainVotes,
                    totalSupply,
                    state } = await govContract.fetchProposalData(id);

                votingDelay = ethers.BigNumber.from(votingDelay).toNumber();

                const b = await provider.getBlockNumber();

                let vp = (snapshot < b) ? await idsContract.getPastVotes(formatID(logInID, true), snapshot) : 0;

                let obj = {
                    'id': ethers.BigNumber.from(id).toHexString(),
                    'state': state,
                    'description': des,
                    'creationBlock': snapshot - votingDelay,
                    'snapshotBlock': ethers.BigNumber.from(snapshot).toNumber(),
                    'endBlock': ethers.BigNumber.from(endBlock).toNumber(),
                    'totalVotes': ethers.BigNumber.from(totalSupply).toNumber(),
                    'forVotes': ethers.BigNumber.from(forVotes).toNumber(),
                    'againstVotes': ethers.BigNumber.from(againstVotes).toNumber(),
                    'abstainVotes': ethers.BigNumber.from(abstainVotes).toNumber(),
                    'votingPower': ethers.BigNumber.from(vp).toNumber(),
                    'hasVoted': await govContract.hasVoted(id, formatID(logInID, true))
                }

                r.push(obj);
            };

            setProposals(r.reverse());

        } catch (error) {
            console.log(error);
        }
    };

    useLayoutEffect(() => {
        checkProposals();
        checkBlock();
    }, [logInID, updateProposals]);

    useEffect(() => {
        checkActiveCensus();
        checkDelegatedID();
    }, [logInID, delegatee]);

    return (
        <GovernanceContext.Provider value={{
            handleDelgationChange,
            submitDelegation,
            delegatee,
            auxID,
            handleTitle,
            handleDescription,
            submitProposal,
            proposalTitle,
            proposalDescription,
            activeCensus,
            block,
            isLoading,
            proposals,
            handleSelect,
            castVote,
            inputRef
        }}>
            {children}
        </GovernanceContext.Provider>
    );
};