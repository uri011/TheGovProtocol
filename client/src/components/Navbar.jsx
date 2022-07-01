import React, { useContext } from 'react';

// Contexts
import { LogInContext } from '../context/LogInContext';

// Tools
import { shortenAddress } from "../tools/FormatTools";

import logo from '../../images/logo.jpeg'


const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-black-400 text-sm font-light text-white";

const Navbar = () => {

    const { connectedAccount, logInID } = useContext(LogInContext);

    return (
        <div>
            <div className="w-full flex md:justify-initial justify-initial items-center">
                <div className="w-full flex md:justify-initial justify-initial items-center p-7">
                    <div className="md:flex-initial flex-initial justify-initial items-center">
                        {/* <img src={logo} alt="logo" className="w-32 cursor-pointer" /> */}
                    </div>
                </div>
                <div className="w-full flex md:justify-end justify-end items-center p-7">
                    <div className="md:flex-center flex-center justify-center items-center">
                        {!connectedAccount && (
                            <div className="md:flex-center flex-center justify-center items-center">
                                <p className="flex justify-center items-center font-mono text-sm">
                                    Wallet Not Conencted
                                </p>
                                <p className="flex justify-center items-center font-bold text-sm">
                                    {shortenAddress(connectedAccount)}
                                </p>
                            </div>
                        )}
                        {connectedAccount && (
                            <div className="md:flex-center flex-center justify-center items-center">
                                <p className="flex justify-center items-center font-mono text-sm">
                                    Wallet Connected
                                </p>
                                <p className="flex justify-center items-center font-mono text-sm">
                                    {shortenAddress(connectedAccount)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full flex md:justify-center justify-center mb-5 items-center">
                {(logInID != '') && (
                    <div className="md:flex-center flex-center justify-center items-center">
                        <p className="flex justify-center items-center font-bold text-sm text-white text-lg border-[2px] p-2 border-black bg-black rounded-full">
                            Connected as - {logInID} -
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;