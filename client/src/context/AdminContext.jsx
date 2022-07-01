import React, { useEffect, useState } from 'react';

// Tools
import { idsContract, connected, installed } from '../tools/Web3Tools';
import { getCensus, postCensus, unpinCensus } from '../tools/IPFSTools';
import { computeMerkleRoot } from '../tools/CryptographyTools';
import { formatID } from '../tools/FormatTools';


export const AdminContext = React.createContext();

export const AdminProvider = ({ children }) => {

    const [accountAddress, setAccountAddress] = useState('');
    const [accountID, setAccountID] = useState('');
    const [projectSecret, setProjectSecret] = useState('');
    const [merkleRootView, setMerkleRootView] = useState('');
    const [ipfsHashView, setIPFSHashView] = useState('');
    const [censusView, setCensusView] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleAddress = (e) => {
        setAccountAddress(e.target.value);
    };

    const handleID = (e) => {
        setAccountID(e.target.value);
    };

    const handleProjectSecret = (e) => {
        setProjectSecret(e.target.value);
    };

    // Updates the IPFS Census and Contract Merkle Tree Root
    const updateCensus = async (isAdd) => {
        try {
            if (!(connected && installed)) return alert('Account Connection Lost');

            setIsLoading(true);

            let ipfsHash = await idsContract.ipfsHash();
            let census = await getCensus(ipfsHash);

            const id = formatID(accountID, true);

            if (isAdd) {
                census.push(accountAddress.toLowerCase() + id);
            } else {
                census.splice(census.indexOf(accountAddress.toLowerCase() + id), 1);
            }

            let oldIpfsHash = ipfsHash;
            ipfsHash = await postCensus(census, projectSecret);

            if (ipfsHash == -1) {
                alert('Project Secret Incorrect');
                window.location.reload();
                return;
            }

            const root = computeMerkleRoot(census);

            let tx;

            if (isAdd) {
                tx = await idsContract.updateCensus(0, root, ipfsHash);
            } else {
                tx = await idsContract.updateCensus(parseInt(id), root, ipfsHash);
            }

            await unpinCensus(oldIpfsHash, projectSecret);

            await tx.wait();

            setIPFSHashView(ipfsHash);
            setMerkleRootView(root);
            setCensusView(census);

            setIsLoading(false);

            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    // Adds account to the census and sets the new Merkle Tree root
    const addAccount = async () => {
        try {
            if (!(connected && installed)) return alert('Account Connection Lost');

            updateCensus(true);

        } catch (error) {
            console.log(error);
        }
    };

    // Removes account from the census, burns ERC721 ID and sets the new Merkle Tree root
    const removeAccount = async () => {
        try {
            if (!(connected && installed)) return alert('Account Connection Lost');

            updateCensus(false);

        } catch (error) {
            console.log(error);
        }
    };

    // Updates Census View
    const checkCensus = async () => {
        try {

            const ipfsHash = await idsContract.ipfsHash();
            const root = await idsContract.merkleRoot();
            const census = await getCensus(ipfsHash);

            setIPFSHashView(ipfsHash);
            setMerkleRootView(root);
            setCensusView(census);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkCensus();
    }, []);

    return (
        <AdminContext.Provider value={{
            handleAddress,
            accountAddress,
            handleID,
            accountID,
            handleProjectSecret,
            projectSecret,
            addAccount,
            removeAccount,
            ipfsHashView,
            censusView,
            merkleRootView,
            isLoading
        }}>
            {children}
        </AdminContext.Provider>
    );
};