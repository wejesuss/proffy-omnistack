import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { SuccessStateProps } from '../@types';

import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';
import Success from '../pages/Success';
import AllRoutes from './all.routes';

const AppRoutes: React.FC = () => {
  return (
    <>
      <AllRoutes />
      <Switch>
        <Route path="/study" exact component={TeacherList} />
        <Route path="/give-classes" exact component={TeacherForm} />
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
      </Switch>
    </>
  );
};

export default AppRoutes;
