import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import config from './constants/ConfigConstants';

import App from './pages/App';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { LoginRoute, LogoutRoute, AuthenticatedRoute } from './components/Stormpath';

import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory()

ReactDOM.render(
  <Router history={history}>
  	<Route path='/' component={App}>
    <Route path={config.LoginPath} redirectTo={config.HomePath} component={LoginPage} />
    <Route path={config.RegisterPath} redirectTo={config.HomePath} component={RegisterPage} />
    <AuthenticatedRoute redirectTo={config.LoginPath}>
      <Route path='/home' component={HomePage} />
    </AuthenticatedRoute>
    <LogoutRoute path={config.LogoutPath} redirectTo={config.LoginPath} />
  	</Route>
  </Router>,
  document.getElementById('container')
);