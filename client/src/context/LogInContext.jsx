import React, { useLayoutEffect, useState } from 'react';

// Tools
import { formatID } from '../tools/FormatTools';
import { getCensus } from '../tools/IPFSTools';
import { idsContract, initialise, connected, installed } from '../tools/Web3Tools';
import { computeMerkleProof } from '../tools/CryptographyTools';

const { ethereum } = window;


export const LogInContext = React.createContext();

export const LogInProvider = ({ children }) => {

    const [connectedAccount, setConnectedAccount] = useState('');
    const [IDs, setIDs] = useState([]);
    const [logInID, setLogInID] = useState('');
    const [registrationID, setRegistrationID] = useState('');
    const [auxID, setAuxID] = useState('');
    const [transferAddress, setTransferAddress] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    window.ethereum.on('accountsChanged', async () => {
        initialise();
        checkAccountConnected();
        window.location.reload();
    });

    // Sets form data with registration ID
    const handleChange = (e) => {
        setRegistrationID(e.target.value);
    };

    // Sets logInID with selected ID owned by connected account
    const handleSelect = (e) => {
        setAuxID(e.value);
    };

    const handleTransferAddress = (e) => {
        setTransferAddress(e.target.value);
    };

    // Sets connected account & account IDs, then reloads window
    const connectWallet = async () => {
        try {
            if (!installed) return alert('Metamask Not Installed');

            const accounts = await ethereum.request({ method: 'eth_requestAccounts', });
            const owner = await idsContract.owner();

            setConnectedAccount(accounts[0]);
            console.log('connectedAccount State Hook Updated to ', accounts[0]);
            updateIDs(accounts[0]);

            if (accounts[0].toLowerCase() === owner.toLowerCase()) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }

            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error('No Ethereum Object');
        }
    };

    // Sets list of IDs owned by current connected account and updates owner status
    const updateIDs = async (addr) => {
        try {
            if (!(connected && installed)) return alert('Account Connection Lost');

            const owner = await idsContract.owner();
            if (addr.toLowerCase() !== owner.toLowerCase()) {

                const balance = await idsContract.balanceOf(addr);

                const auxIDs = []
                for (let i = 0; i < parseInt(balance); i++) {
                    const aux = await idsContract.tokenOfOwnerByIndex(addr, i);
                    auxIDs[i] = formatID(aux.toString(), false);
                }

                setIDs(auxIDs);
                setIsOwner(false);

            } else {
                setLogInID('owner');
                setIDs(['owner']);
                setIsOwner(true);
            }

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    // Checks if ID & address pair whitelisted and mints if true
    const mintID = async () => {
        try {
            if (!(connected && installed)) return alert('Account Connection Lost');

            setIsLoading(true);

            const id = formatID(registrationID, true);

            const ipfsHash = await idsContract.ipfsHash();
            const census = await getCensus(ipfsHash);

            const merkleProof = computeMerkleProof(connectedAccount, parseInt(id), census);

            const permission = census.includes(connectedAccount + id);

            if (permission) {
                let tx = await idsContract.whiteListMint(parseInt(id), merkleProof);
                await tx.wait();
            } else {
                alert('ID Mint Permission Denied');
                console.log('ID Mint Permission Denied');
            }

            setIsLoading(false);
            connectWallet();

        } catch (error) {
            (error.code === 'UNPREDICTABLE_GAS_LIMIT') ? alert('Whitelist Requirements Not Met') : console.log(error);
            throw new Error('No Ethereum Object');
        }
    };

    // Sets logInID with auxID value
    const logIn = async () => {
        try {
            if (!(connected && installed)) return alert('Connection Lost');

            setLogInID(auxID);
            console.log('LogInId State Hook Update to ', auxID);

        } catch (error) {
            console.log(error);
            throw new Error('No Ethereum Object');
        }
    };

    // Transfers Selected ERC721 ID
    const transferID = async () => {
        try {
            if (!(connected && installed)) return alert('Connection Lost');

            setIsLoading(true);

            const id = formatID(auxID, true);

            let tx = await idsContract.transferFrom(connectedAccount, transferAddress, parseInt(id));
            await tx.wait();

            setIsLoading(false);

            window.location.reload();

        } catch (error) {
            console.log(error);
            throw new Error('No Ethereum Object');
        }
    };

    // Checks connected wallet, updates account owned IDs and checks if account is logged in
    const checkAccountConnected = async () => {
        try {
            initialise();

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);
                updateIDs(accounts[0]);

                if ((!IDs.includes(logInID)) && (logInID !== '')) {
                    setLogInID('');
                    setIDs([]);
                }

            } else {
                setConnectedAccount('');
                setLogInID('');
                setIDs([]);

                console.log('Account Connection Not Found');
            }

        } catch (error) {
            console.log(error);
        }
    };

    useLayoutEffect(() => {
        checkAccountConnected();
    }, []);

    return (
        <LogInContext.Provider value={{
            handleChange,
            handleSelect,
            handleTransferAddress,
            connectWallet,
            mintID,
            logIn,
            connectedAccount,
            IDs,
            logInID,
            registrationID,
            auxID,
            transferAddress,
            transferID,
            isOwner,
            isLoading
        }}>
            {children}
        </LogInContext.Provider>
    );
};