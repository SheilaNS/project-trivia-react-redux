import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

// Commit Inicial

const Routes = () => (
  <Switch>
    <Route component={ Login } path="/" exact />
    <Route component={ Quiz } path="/quiz-game" />
    <Route component={ Settings } path="/settings" />
    <Route component={ Feedback } path="/feedback" />
    <Route component={ Ranking } path="/ranking" />
  </Switch>
);

export default Routes;
