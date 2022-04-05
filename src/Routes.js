import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Quiz from './pages/Quiz';

const Routes = () => (
  <Switch>
    <Route component={ Login } path="/" exact />
    <Route component={ Quiz } path="quiz-game" />
  </Switch>
);

export default Routes;
