import React, { useContext } from "react";

import { Navbar, LogIn, Proposals, ProposalsCreate, Admin, VoteDelegate, Footer } from './components';

import { LogInContext } from '../src/context/LogInContext';

const App = () => {

  const { logInID, isOwner } = useContext(LogInContext);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-main">
        <Navbar />
        {(logInID === '') && (<LogIn />)}
        {(logInID !== '') && (<VoteDelegate />)}
        {(logInID !== '') && (<ProposalsCreate />)}
        {(logInID !== '') && (<Proposals />)}
        {(logInID !== '') && isOwner && (<Admin />)}
      </div>
      <Footer />
    </div>
  );
}

export default App;
