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
  }

  onChange() {
    var self = this;
    UserStore.isAuthenticated(function (err, authenticated) {
      if (self.onChangeListener !== null) {
        self.setState({ authenticated: !!authenticated });
      }
    });
  }

  componentWillMount() {
    this.onChangeListener = this.onChange.bind(this);
    UserStore.addChangeListener(this.onChangeListener);
    this.onChange();
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChangeListener);
    this.onChangeListener = null;
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
      var redirectTo = this.redirectTo || '/';
      UserActions.logout(function () {
        replaceState({ nextPathname: nextState.location.pathname }, redirectTo);
        callback();
      });
    }
  }
}

export class AuthenticatedRoute extends Route {
  static defaultProps = {
    onEnter(nextState, replaceState, callback) {
      var redirectTo = this.redirectTo || '/';
      UserStore.isAuthenticated(function (err, authenticated) {
        if (err || !authenticated) {
          replaceState({ nextPathname: nextState.location.pathname }, redirectTo); 
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