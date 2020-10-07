import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UserHeader from '../../components/UserHeader';

import { RoutesPath } from '../../@types';
import api from '../../services/api';
import { useAuth } from '../../contexts/auth';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

const Landing: React.FC = () => {
  const { user } = useAuth();
  const [total, setTotal] = useState(0);

  async function getConnections() {
    const { data } = await api.get(RoutesPath.connections);

    return data.total;
  }

  useEffect(() => {
    let isMounted = true;
    getConnections().then((actualTotal) => {
      if (isMounted) setTotal(() => actualTotal);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        {user?.id ? (
          <UserHeader
            name={`${user.name} ${user.surname}`}
            image={user.avatar}
          />
        ) : (
          <div className="user-container">
            <div className="user" />

            <Link to="/login" className="login">
              Log in
            </Link>
          </div>
        )}

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
          <h2>
            <>
              Seja bem vindo!
              <br />
              <strong>O que deseja?</strong>
            </>
          </h2>
          <span className="total-connections">
            <>
              Total de
              <strong>{total}</strong>
              conexões
              <br />
              já realizadas
              {'  '}
              <img src={purpleHeartIcon} alt="Coração Roxo" />
            </>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
