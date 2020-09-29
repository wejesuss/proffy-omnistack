import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../components/Input';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';
import api from '../../services/api';

const ForgotPassword: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    api
      .post('/users/forgot-password', {
        email,
      })
      .then(
        () => {
          alert('enviamos um email para você');
          history.push('/login');
        },
        (reason) => {
          alert(reason.response.data.error);
        },
      );
  }

  return (
    <div id="page-forgot-password">
      <div id="forgot-password">
        <Link to="/login">
          <img src={backIcon} alt="Voltar" />
        </Link>

        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <legend>
              <>
                Eita, esqueceu
                <br />
                sua senha?
              </>
            </legend>
            <Input
              name="email"
              label="Não esquenta, vamos dar um jeito nisso."
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Enviar</button>
          </fieldset>
        </form>
      </div>
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
    </div>
  );
};

export default ForgotPassword;
