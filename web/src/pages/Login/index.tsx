import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { getErrorMessage } from '../../utils';
import { useAuth } from '../../contexts/auth';

import Input from '../../components/Input';
import LogoContainer from '../../components/LogoContainer';
import ControlContainer from '../../components/ControlContainer';

import shownPassIcon from '../../assets/images/icons/show-password.svg';
import hidedPassIcon from '../../assets/images/icons/hide-password.svg';
import heartIcon from '../../assets/images/icons/purple-heart.svg';
import './styles.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const { signIn, signOut } = useAuth();

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage('');

    const credentials = {
      email,
      password,
    };

    const { result, error } = await signIn(credentials, remember);

    if (result) {
      history.push('/');
    } else {
      console.error(error?.response?.data?.error);
      setMessage(
        getErrorMessage(error?.response?.data?.error || error?.message),
      );

      setPassword('');
    }
  }

  useEffect(signOut, []);

  return (
    <div id="page-login">
      <LogoContainer />

      <ControlContainer pageId="login" backLink="/">
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <legend>Fazer Login</legend>

            <Input
              id="email"
              leftBar
              name="email"
              label="E-mail"
              type="email"
              upLabel={{ active: !!email }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="password"
              leftBar
              name="password"
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              upLabel={{ active: !!password }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              symbol={
                showPassword ? (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img src={shownPassIcon} alt="Ocultar senha" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img src={hidedPassIcon} alt="Mostrar senha" />
                  </button>
                )
              }
            />

            <div className="control-box">
              <button type="button" onClick={() => setRemember(!remember)}>
                <div
                  className={
                    remember ? 'remember-checkbox active' : 'remember-checkbox'
                  }
                />
              </button>

              <Input
                id="remember"
                type="checkbox"
                label="Lembrar-me"
                name="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />

              <Link to="/forgot-pswd">Esqueci minha senha</Link>
            </div>

            <button
              type="submit"
              disabled={!(email && password)}
              className={email && password ? 'active' : ''}
            >
              Entrar
            </button>

            <p className="message">{message}</p>

            <div className="create-account">
              <p>
                <>
                  Não tem conta?
                  <br />
                  <Link to="/signup">Cadastre-se</Link>
                </>
              </p>
              <p>
                <>
                  É de graça
                  <img src={heartIcon} alt="Coração Roxo" />
                </>
              </p>
            </div>
          </fieldset>
        </form>
      </ControlContainer>
    </div>
  );
};

export default Login;
