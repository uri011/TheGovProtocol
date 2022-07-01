import { ethers } from 'ethers';
import axios from 'axios';

import { formatID } from './FormatTools';

const { ethereum } = window;

import { EtherscanAPIKey, idsContractAddrProxy, idsContractAddrImpl, govContractAddrProxy, govContractAddrImpl } from '../utils/constants';

export const createProvider = (ethereum) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    return provider;
};

export const createEthereumContract = async (provider, contractAddressProxy, contractAddressImpl) => {
    try {
        const response = await axios.get('https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address=' + contractAddressImpl + '&apikey=' + EtherscanAPIKey, {});
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddressProxy, response.data.result, signer);
        return contract;
    } catch (error) {
        console.log(error);
    }
};

export const provider = createProvider(ethereum);
export const idsContract = await createEthereumContract(provider, idsContractAddrProxy, idsContractAddrImpl);
export const govContract = await createEthereumContract(provider, govContractAddrProxy, govContractAddrImpl);

export const getActiveCensus = async () => {
    const supply = await idsContract.totalSupply();
    const ids = [];
    for (let i = 0; i < parseInt(supply); i++) {
        const id = await idsContract.getDelegateeByIndex(i);
        if (id != 0) {
            ids[i] = formatID(id.toString(), false);
        }
    }
    return ids;
};

export var connected = false;
export var installed = false;

const isMetaMaskInstalled = () => {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
};

const isMetaMaskConnected = async () => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    return accounts && accounts.length > 0;
};

export const initialise = async () => {
    connected = await isMetaMaskConnected();
    installed = isMetaMaskInstalled();
};