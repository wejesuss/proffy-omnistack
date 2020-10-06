import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import AllRoutes from './all.routes';

const AuthRoutes: React.FC = () => {
  return (
    <>
      <AllRoutes />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/forgot-pswd" exact component={ForgotPassword} />
      </Switch>
    </>
  );
};

export default AuthRoutes;
