import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SuccessProps } from '../../@types';

import logoImg from '../../assets/images/logo.svg';
import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';

const Success: React.FC<SuccessProps> = ({
  message,
  messageTitle,
  buttonText,
  buttonLink,
}: SuccessProps) => {
  const history = useHistory();
  const delayedRedirect = () => {
    setTimeout(() => history.push(buttonLink), 3500);
  };

  return (
    <div id="page-landing-success">
      <div id="page-success" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Logo Proffy" />
        </div>

        <div className="success-container">
          <div className="success-information">
            <img src={successIcon} alt="Sucesso ao criar" />
            <h1>{messageTitle}</h1>
            <p>{message}</p>
          </div>
          <Link to={buttonLink}>{buttonText}</Link>
        </div>
      </div>
      {delayedRedirect()}
    </div>
  );
};

export default Success;
