import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Landing from '../pages/Landing';
import { getSessionUser } from '../utils';

const AuthRoutes: React.FC = () => {
  const user = getSessionUser();

  return (
    <>
      <Switch>
        <Route path="/" exact component={Landing} />

        <Route
          path="/login"
          exact
          render={() => {
            if (user?.id) {
              return <Redirect to="/" />;
            }

            return <Login />;
          }}
        />
        <Route
          path="/forgot-pswd"
          exact
          render={() => {
            if (user?.id) {
              return <Redirect to="/" />;
            }

            return <ForgotPassword />;
          }}
        />

        <Route
          path="*"
          render={() => {
            if (!user?.id) return <Redirect to="/login" />;

            return <></>;
          }}
        />
      </Switch>
    </>
  );
};

export default AuthRoutes;
