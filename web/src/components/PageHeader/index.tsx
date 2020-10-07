import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeaderProps } from '../../@types';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  children,
  description,
  topBarTitle,
}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        {topBarTitle && <h1 className="title">{topBarTitle}</h1>}
        <img src={logoImg} alt="Logo Proffy" />
      </div>
      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
};

export default PageHeader;
