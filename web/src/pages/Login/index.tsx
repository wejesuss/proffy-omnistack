import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// import api from '../../services/api';
// import { getErrorMessage } from '../../utils';

import Input from '../../components/Input';
import LogoContainer from '../../components/LogoContainer';

import './styles.css';
import ControlContainer from '../../components/ControlContainer';

const Login: React.FC = () => {
  // const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div id="page-login">
      <LogoContainer />

      <ControlContainer pageId="login" backLink="/">
        <form onSubmit={handleFormSubmit}>
          <fieldset>
            <legend>Fazer Login</legend>

            <Input
              id="email"
              name="email"
              label="E-mail"
              type="email"
              upLabel={{ active: !!email }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="password"
              name="password"
              label="Senha"
              type="password"
              upLabel={{ active: !!password }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input type="checkbox" label="Lembrar-me" name="remember" />

            <Link to="/forgot-pswd">Esqueci minha senha</Link>

            <button type="submit">Entrar</button>
          </fieldset>
        </form>
      </ControlContainer>
    </div>
  );
};

export default Login;
