import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import App from './pages/App';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { LoginRoute, LogoutRoute, AuthenticatedRoute } from './components/Stormpath';

import createBrowserHistory from 'history/lib/createBrowserHistory'
let history = createBrowserHistory()

ReactDOM.render(
	<Router history={history}>
	  	<Route path='/' component={App}>
        <Route path='/home' component={HomePage} />
        <Route path='/register' component={RegisterPage} />
        <AuthenticatedRoute>
          <Route path='/home/protected' component={RegisterPage} />
        </AuthenticatedRoute>
        <LogoutRoute path='/logout' />
	  	</Route>
	</Router>,
	document.getElementById('container')
);