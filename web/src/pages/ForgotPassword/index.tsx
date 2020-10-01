import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';
import { getErrorMessage } from '../../utils';

import Input from '../../components/Input';
import LogoContainer from '../../components/LogoContainer';

import './styles.css';
import ControlContainer from '../../components/ControlContainer';

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
          alert(getErrorMessage(reason?.response?.data?.error) || reason);
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

            <button type="submit">Enviar</button>
          </fieldset>
        </form>
      </ControlContainer>

      <LogoContainer />
    </div>
  );
};

export default ForgotPassword;
