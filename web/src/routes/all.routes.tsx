import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from '../pages/Landing';

const AllRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
    </Switch>
  );
};

export default AllRoutes;
