import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { RoutesPath } from '../../@types';
import api from '../../services/api';
import { getErrorMessage } from '../../utils';

import Input from '../../components/Input';
import LogoContainer from '../../components/LogoContainer';

import './styles.css';
import ControlContainer from '../../components/ControlContainer';

const ForgotPassword: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    api
      .post(RoutesPath.forgotPswd, {
        email,
      })
      .then(
        () => {
          history.push('/success', {
            success: true,
            messageTitle: 'Redefinição enviada!',
            message:
              'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.',
            buttonText: 'Voltar ao login',
            buttonLink: '/login',
          });
        },
        (reason) => {
          setMessage(getErrorMessage(reason?.response?.data?.error) || reason);
        },
      );
  }

  return (
    <div id="page-forgot-password">
      <ControlContainer pageId="forgot-password" backLink="/login">
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <legend>
              <>
                Eita, esqueceu
                <br />
                sua senha?
              </>
            </legend>

            <p>Não esquenta, vamos dar um jeito nisso.</p>

            <Input
              id="email"
              name="email"
              label="E-mail"
              upLabel={{ active: !!email }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={!email}
              className={email ? 'active' : ''}
            >
              Enviar
            </button>

            <p className="message">{message}</p>
          </fieldset>
        </form>
      </ControlContainer>

      <LogoContainer />
    </div>
  );
};

export default ForgotPassword;
