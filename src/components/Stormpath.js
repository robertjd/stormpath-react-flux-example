import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, { Route } from 'react-router';

import UserStore from './../stores/UserStore';
import UserActions from './../actions/UserActions';

export class Authenticated extends React.Component {
  onChangeListener = null;

  state = {
    authenticated: false
  };

  constructor() {
    super();
    this.onChangeListener = this.onChange.bind(this);
  }

  onChange() {
    var self = this;
    UserStore.isAuthenticated(function (err, authenticated) {
      self.setState({ authenticated: !!authenticated });
    });
  }

  componentWillMount() {
    UserStore.addChangeListener(this.onChangeListener);
    this.onChange();
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChangeListener);
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
      UserActions.logout(function () {
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