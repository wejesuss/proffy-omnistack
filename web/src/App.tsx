import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './assets/styles/global.css';

import AuthProvider from './contexts/auth';
import Routes from './routes/index';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
