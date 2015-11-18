import React, { Component } from 'react';
import ReactRouter, { Route } from 'react-router';
import UserStore from './../stores/UserStore';

export class Authenticated extends Component {
  state = {
    authenticated: false
  };

  componentDidMount() {
    var self = this;

    function assertAuthState() {
      UserStore.isAuthenticated(function (err, authenticated) {
        self.setState({ authenticated: authenticated });
      });
    }

    UserStore.addChangeListener(assertAuthState);

    assertAuthState();
  }

  render() {  
    return this.state.authenticated ? (
      <span>{this.props.children}</span>
    ) : null;
  }
}

export class NotAuthenticated extends Authenticated {
  render() {
    return !this.state.authenticated ? (
      <span>{this.props.children}</span>
    ) : null;
  }
}

export class LogoutRoute extends Route {
  static defaultProps = {
    onEnter(nextState, replaceState, callback) {
      UserStore.logout(function () {
        replaceState({ nextPathname: nextState.location.pathname }, '/home');
        callback();
      });
    }
  }
}

export class AuthenticatedRoute extends Route {
  static defaultProps = {
    onEnter(nextState, replaceState, callback) {
      UserStore.isAuthenticated(function (err, authenticated) {
        if (err || !authenticated) {
          replaceState({ nextPathname: nextState.location.pathname }, '/home'); 
        }
        callback();
      });
    }
  }
}

export class HomeRoute extends Route {
  static defaultProps = {
  }
}

export class LoginRoute extends Route {
  static defaultProps = {
  }
}