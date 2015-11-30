import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route } from 'react-router';

import config from './constants/ConfigConstants';

import App from './pages/App';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HomePage from './pages/HomePage';
import { StormpathRouter, HomeRoute, LoginRoute, LogoutRoute, AuthenticatedRoute } from './components/Stormpath';

import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory()

ReactDOM.render(
  <StormpathRouter history={history}>
  	<Route path='/' component={App}>
      <IndexRoute component={IndexPage} />
      <LoginRoute path={config.LoginPath} component={LoginPage} />
      <LogoutRoute path={config.LogoutPath} />
      <Route path={config.RegisterPath} redirectTo={config.HomePath} component={RegisterPage} />
      <Route path={config.ResetPasswordPath} redirectTo={config.HomePath} component={ResetPasswordPage} />
      <AuthenticatedRoute>
        <HomeRoute path={config.HomePath} component={HomePage} />
      </AuthenticatedRoute>
  	</Route>
  </StormpathRouter>,
  document.getElementById('app-container')
);