import React, { useContext } from 'react';

// Contexts
import { LogInContext } from '../context/LogInContext';

// import logo from "../../images/logo.jpeg";


const Footer = () => {

    const { logInID } = useContext(LogInContext);

    return (
        <div>
            {(logInID == '') && (
                <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
                    <div className="flex justify-center items-center flex-col">
                        <p className="text-white text-sm text-center mt-20 text-lg">A secure and reliable ID based governance protocol <br />
                            with single user identification, access control and transparency. <br /> <br />
                            Community members will be able to enjoy a censorship resistant <br />
                            voting system without having to rely on third parties or entities to do so. <br />
                            The voting system is auditable by anyone and it can be upgraded without losing <br />
                            the state it currently has and proposals history.</p>
                    </div>

                    <div className="flex justify-center items-center flex-col mt-20">
                        <p className="text-white text-sm text-center">Creating a fair and secure future for governance systems</p>
                        <p className="text-white text-sm text-center mt-4">Developed by Jordi Pérez González and Oriol Rodríguez Setó</p>
                        <p className="text-white text-sm text-center font-medium mt-4">jordi.perez.g@estudiantat.upc.edu</p>
                        <p className="text-white text-sm text-center font-medium mt-2">oriol.rodriguez.seto@estudiantat.upc.edu</p>
                    </div>
                    <div className="flex flex-[0.5] justify-center items-center mt-10">
                        {/* <img src={logo} alt="logo" className="w-32" /> */}
                    </div>
                    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />
                    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                        <p className="text-white text-left text-xs">@TheZKGov</p>
                        <p className="text-white text-right text-xs">All rights reserved</p>
                    </div>
                </div>
            )}
            {(logInID != '') && (
                <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
                    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />
                    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
                        <p className="text-white text-left text-xs">@TheZKGov</p>
                        <p className="text-white text-right text-xs">All rights reserved</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Footer;