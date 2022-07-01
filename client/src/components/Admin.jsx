import React, { useContext } from 'react';

// Contexts
import { AdminContext } from '../context/AdminContext';

// Components
import { Loader } from '.';


const Input = ({ placeholder, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e)}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white text-center border-none text-sm white-glassmorphism"
    />
);

const CensusItem = ({ title, classprops }) => (
    <ol className={`mx-4 mb-2 ${classprops}`}>{title.substr(0, title.length - 10)} - {title.substr(title.length - 10)}</ol>
);

const Admin = () => {

    const { handleAddress,
        accountAddress,
        handleID,
        accountID,
        handleProjectSecret,
        projectSecret,
        addAccount,
        removeAccount,
        ipfsHashView,
        merkleRootView,
        censusView,
        isLoading } = useContext(AdminContext);

    const handleAddAccount = (e) => {
        if (!accountAddress) return;
        if (!accountID) return;
        if (!projectSecret) return;
        addAccount();
    };

    const handleRemoveAccount = (e) => {
        if (!accountAddress) return;
        if (!accountID) return;
        if (!projectSecret) return;
        removeAccount();
    };

    return (
        <div>
            <div className="w-full flex md:justify-center justify-between items-center flex-col">
                <div className="flex w-2/3 h-[0.25px] bg-gray-400 mt-5 mb-3" />
                <div>
                    <div className="text-white text-base text-center font-medium mt-5">
                        <p className="mb-3">Enter Address and ID to Add in Census</p>
                    </div>
                    <div className="flex justify-center text-center">
                        <div className="p-5 mt-5 mb-10 sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
                            <Input placeholder="Account Address" name="address" type="text" handleChange={handleAddress} />
                            <Input placeholder="Account ID" name="id" type="text" handleChange={handleID} />
                            <Input placeholder="Project Secret" name="secret" type="text" handleChange={handleProjectSecret} />
                            <div className="h-[1px] w-full bg-gray-400 my-2" />
                            {isLoading
                                ? <Loader />
                                : (
                                    <button
                                        type="button"
                                        onClick={handleAddAccount}
                                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#97e7bd] hover:text-black rounded-full cursor-pointer"
                                    >
                                        Add Account
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
                <div className="flex w-2/3 h-[0.25px] bg-gray-400 mt-5 mb-3" />
                <div>
                    <div className="text-white text-base text-center font-medium mt-5">
                        <p className="mb-3">Enter Address and ID to Remove from Census</p>
                    </div>
                    <div className="flex justify-center text-center">
                        <div className="p-5 mt-5 mb-10 sm:w-96 w-full flex flex-col justify-center items-center blue-glassmorphism">
                            <Input placeholder="Account Address" name="address" type="text" handleChange={handleAddress} />
                            <Input placeholder="Account ID" name="id" type="text" handleChange={handleID} />
                            <Input placeholder="Project Secret" name="secret" type="text" handleChange={handleProjectSecret} />
                            <div className="h-[1px] w-full bg-gray-400 my-2" />
                            {isLoading
                                ? <Loader />
                                : (
                                    <button
                                        type="button"
                                        onClick={handleRemoveAccount}
                                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#f64c4c] hover:text-black rounded-full cursor-pointer"
                                    >
                                        Remove Account
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
                <div className="flex w-2/3 h-[0.25px] bg-gray-400 mt-5 mb-3" />
                <div>
                    <div className="text-white text-base text-center font-medium mt-5">
                        <p className="mb-3">Current IPFS Hash</p>
                        <p className="mb-3"><br />{ipfsHashView}</p>
                        <p className="mb-3 mt-10">Current Merkle Tree Root</p>
                        <p className="mb-3"><br />{merkleRootView}</p>
                        <p className="mb-3 mt-10">Current Census</p>
                    </div>
                    <div className="flex justify-center text-center">
                        <div className="p-5 mt-5 mb-10 flex flex-col justify-center items-center blue-glassmorphism">
                            <div className="font-bold text-white text-sm">
                                {censusView.map((item, index) => (
                                    <CensusItem key={item + index} title={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;