import React from 'react'
import ReactDOM from 'react-dom/client'
import { Buffer } from 'buffer';

import App from './App'
import './index.css'
import { LogInProvider } from './context/LogInContext';
import { GovernanceProvider } from './context/GovernanceContext';
import { AdminProvider } from './context/AdminContext';
import { ViewStateProvider } from './context/ViewStateContext';

window.Buffer = window.Buffer || Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <LogInProvider>
    <GovernanceProvider>
      <AdminProvider>
        <ViewStateProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ViewStateProvider>
      </AdminProvider>
    </GovernanceProvider>
  </LogInProvider>,
)
