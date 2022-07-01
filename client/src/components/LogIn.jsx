import React, { useContext } from 'react';
import Select from 'react-select';

// Contexts
import { LogInContext } from '../context/LogInContext';

// Components
import { Loader } from ".";

// Utils
import { idsContractAddrProxy } from '../utils/constants.js';


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e)}
        className="mt-2 my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-center border-none text-sm white-glassmorphism"
    />
);

const LogIn = () => {

    const { handleChange,
        handleSelect,
        handleTransferAddress,
        connectWallet,
        mintID,
        logIn,
        connectedAccount,
        IDs,
        registrationID,
        auxID,
        transferAddress,
        transferID,
        isLoading } = useContext(LogInContext);

    const handleRegistration = (e) => {
        if (!registrationID) return;
        mintID();
    };

    const handleLogIn = (e) => {
        if (!auxID) return;
        logIn();
    };

    const handleTransfer = (e) => {
        if (!auxID) return;
        if (!transferAddress) return;
        transferID();
    };

    return (
        <div>
            <div className="flex w-full justify-center items-center">
                <div className="flex mf:flex-row flex-col items-start justify-between">
                    <div className="flex flex-1 justify-start flex-col md:mr-10">
                        <h1 className="text-center text-3xl sm:text-5xl text-white text-gradient py-5">
                            The Governance Protocol
                        </h1>
                        {!connectedAccount &&
                            (<div className="justify-center text-center">
                                <p className="text-center mt-5 text-white font-light md:w-11/12 w-11/12 text-base">
                                    The next generation of governance systems.
                                </p>
                                <button
                                    type="button"
                                    onClick={connectWallet}
                                    className="w-full flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                                    <p className="text-white text-base font-semibold">
                                        Connect Wallet
                                    </p>
                                </button>
                            </div>)
                        }
                        {connectedAccount && (IDs?.length == 0) && (
                            <div>
                                <div className="flex justify-center text-center">
                                    <div className="p-5 mt-5 mb-10 sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
                                        <Input placeholder="Enter Registration ID" name="id" type="text" handleChange={handleChange} />
                                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                                        {isLoading
                                            ? <Loader />
                                            : (
                                                <button
                                                    type="button"
                                                    onClick={handleRegistration}
                                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                                >
                                                    Register
                                                </button>
                                            )}
                                    </div>
                                </div>
                                <div className="flex justify-center text-center">
                                    <p className="text-center mt-5 mb-5 text-white font-medium md:w-11/12 w-11/12 text-base">
                                        ERC721 ID Contract Address <br /> <br /> {idsContractAddrProxy}
                                    </p>
                                </div>
                            </div>
                        )}
                        {connectedAccount && (IDs?.length > 0) && (
                            <div>
                                <div className="flex justify-center text-center">
                                    <div className="p-5 mt-5 mb-10 sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
                                        <p className="w-full justify-center text-center mb-5 text-white font-medium text-base">
                                            Wallet ERC721s IDs
                                        </p>
                                        < Select
                                            className="font-bold text-base mb-5"
                                            defaultValue={{ label: 'Select ERC721 ID', value: 'empty' }}
                                            options={IDs.map(id => ({ label: id, value: id }))}
                                            onChange={handleSelect} />
                                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                                        {isLoading
                                            ? <Loader />
                                            : (
                                                <button
                                                    type="button"
                                                    onClick={handleLogIn}
                                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                                >
                                                    Log In
                                                </button>
                                            )}
                                    </div>
                                </div>
                                <div className="flex justify-center text-center">
                                    <div className="p-5 mt-10 mb-10 sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
                                        <p className="w-full justify-center text-center mb-5 text-white font-medium text-base">
                                            Transfer ERC721 ID
                                        </p>
                                        < Select
                                            className="font-bold text-base mb-5"
                                            defaultValue={{ label: 'Select ERC721 ID', value: 'empty' }}
                                            options={IDs.map(id => ({ label: id, value: id }))}
                                            onChange={handleSelect} />
                                        <Input placeholder="Enter Address to Transfer To" name="addr" type="text" handleChange={handleTransferAddress} />
                                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                                        {isLoading
                                            ? <Loader />
                                            : (
                                                <button
                                                    type="button"
                                                    onClick={handleTransfer}
                                                    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                                                >
                                                    Transfer
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Reliability</div>
                            <div className={`xs:rounded-tr-2xl ${companyCommonStyles}`}>Security</div>
                            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>Autonomus</div>
                            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>Serverless</div>
                            <div className={`xs:rounded-bl-2xl ${companyCommonStyles}`}>Web 3.0</div>
                            <div className={`rounded-br-2xl ${companyCommonStyles}`}>Censorship Resistant</div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}

export default LogIn;