import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

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
    <Route path='/login' redirectTo='/home' component={LoginPage} />
    <Route path='/register' component={RegisterPage} />
    <AuthenticatedRoute redirectTo='/login'>
      <Route path='/home' component={HomePage} />
    </AuthenticatedRoute>
    <LogoutRoute path='/logout' redirectTo='/login' />
  	</Route>
  </Router>,
  document.getElementById('container')
);