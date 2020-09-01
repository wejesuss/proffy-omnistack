/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

const Landing: React.FC = () => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    api.get("/connections").then(result => {
      const {total} = result.data
      setTotal(total)
    })

  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="user-container">
          <div className="user">
            <img src="https://github.com/maykbrito.png" alt="Conta do usuário"/>
            Mayk Brito
          </div>
          <div className="logout">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#774DD6"/>
              <path d="M25.3 15.5332C26.3487 16.5822 27.0627 17.9186 27.3519 19.3734C27.6411 20.8282 27.4924 22.336 26.9247 23.7063C26.357 25.0766 25.3957 26.2478 24.1624 27.0718C22.9291 27.8958 21.4791 28.3356 19.9959 28.3356C18.5126 28.3356 17.0626 27.8958 15.8293 27.0718C14.596 26.2478 13.6347 25.0766 13.067 23.7063C12.4993 22.336 12.3506 20.8282 12.6398 19.3734C12.929 17.9186 13.643 16.5822 14.6917 15.5332" stroke="#D4C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20 11.6665V19.9998" stroke="#D4C2FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div className="logo-container">
          <img src={logoImg} alt="Logo Proffy" />
          <h2>Sua plataforma de estudos online</h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar Aulas
          </Link>
        </div>

        <div className="greeting">
          <h2>Seja bem vindo! <br/>
            <strong>O que deseja?</strong>
          </h2>
          <span className="total-connections">
            Total de
            <strong> {total} </strong>
            conexões <br/> já realizadas{' '}
            <img src={purpleHeartIcon} alt="Coração Roxo" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
