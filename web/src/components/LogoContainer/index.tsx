import React from 'react';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';

const LogoContainer: React.FC = () => {
  return (
    <div id="logo-container">
      <div className="logo">
        <img src={logoImg} alt="Logo Proffy" />
        <h2>
          <>
            Sua plataforma de
            <br />
          </>
          estudos online
        </h2>
      </div>
    </div>
  );
};

export default LogoContainer;
