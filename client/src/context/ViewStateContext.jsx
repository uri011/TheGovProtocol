import React, { useEffect, useState } from 'react';


export const ViewStateContext = React.createContext();

export const ViewStateProvider = ({ children }) => {

    const [viewDV, setViewDV] = useState(false);
    const [viewPC, setViewPC] = useState(false);

    const handleViewDV = (e) => {
        setViewDV(!viewDV);
    };

    const handleViewPC = (e) => {
        setViewPC(!viewPC);
    };

    useEffect(() => {
    }, []);

    return (
        <ViewStateContext.Provider value={{
            viewDV,
            handleViewDV,
            viewPC,
            handleViewPC
        }}>
            {children}
        </ViewStateContext.Provider>
    );
};