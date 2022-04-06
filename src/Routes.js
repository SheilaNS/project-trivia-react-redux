import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

// Commit Inicial

const Routes = () => (
  <Switch>
    <Route component={ Login } path="/" exact />
  </Switch>
);

export default Routes;
