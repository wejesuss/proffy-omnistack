import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { SuccessStateProps } from './@types';

import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';
import Success from './pages/Success';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" exact component={TeacherList} />
      <Route path="/give-classes" exact component={TeacherForm} />
      <Route
        path="/login"
        exact
        render={() => {
          if (localStorage.getItem('JWT')) {
            return <Redirect to="/study" />;
          }

          return <Login />;
        }}
      />
      <Route
        path="/signup"
        exact
        render={() => {
          if (localStorage.getItem('JWT')) {
            return <Redirect to="/study" />;
          }

          return <Landing />;
        }}
      />
      <Route
        path="/forgot-pswd"
        exact
        render={() => {
          if (localStorage.getItem('JWT')) {
            return <Redirect to="/study" />;
          }

          return <ForgotPassword />;
        }}
      />
      <Route
        path="/success"
        exact
        render={({ location }) => {
          const successProps = location.state as SuccessStateProps;

          if (successProps?.success) {
            return <Success {...successProps} />;
          }
          return <Redirect to="/" />;
        }}
      />
    </BrowserRouter>
  );
};

export default Routes;
