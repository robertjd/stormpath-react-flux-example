import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, { Router, Route } from 'react-router';

import UserStore from './../stores/UserStore';
import UserActions from './../actions/UserActions';

export class Authenticating extends React.Component {
}

export class Authenticated extends React.Component {
  onChangeListener = null;

  state = {
    authenticated: null
  };

  constructor() {
    super();
  }

  onChange() {
    var self = this;
    UserStore.isAuthenticated(function (err, authenticated) {
      if (self.onChangeListener !== null) {
        self.setState({ authenticated: authenticated === true });
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
    return this.state.authenticated === true ?
      this.props.children : null;
  }
}

export class NotAuthenticated extends Authenticated {
  render() {
    return this.state.authenticated === false ?
      this.props.children : null;
  }
}

export class LogoutRoute extends Route {
  static defaultProps = {
    onEnter(nextState, replaceState, callback) {
      var router = SharedContext.getInstance().router;

      var loginRoute = router.getLoginRoute();
      var redirectTo = loginRoute ? loginRoute.path : this.redirectTo || '/';

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
      var router = SharedContext.getInstance().router;

      var loginRoute = router.getLoginRoute();
      var redirectTo = loginRoute ? loginRoute.path : this.redirectTo || '/';

      UserStore.isAuthenticated(function (err, authenticated) {
        if (err || !authenticated) {
          replaceState({ nextPathname: nextState.location.pathname }, redirectTo); 
        }
        callback();
      });
    }
  }
}

let sharedContextInstance = null;

export class SharedContext {
  constructor() {
    if (sharedContextInstance) {
      return this;
    }

    this.router = null;

    sharedContextInstance = this;
  }

  static getInstance() {
    if (!sharedContextInstance) {
      return new SharedContext();
    }
    return sharedContextInstance;
  }

  setRouter(router) {
    this.router = router;
  }

  getRouter() {
    return this.router;
  }
}

export class StormpathRouter extends Router {
  markedRoutes = {
    home: { type: HomeRoute, props: null },
    login: { type: LoginRoute, props: null },
    logout: { type: LogoutRoute, props: null }
  };

  constructor() {
    super(...arguments);
    this._mapMarkedRoutes();
    SharedContext.getInstance().setRouter(this);
  }

  _getChildren(target) {
    if (!target.props.children) {
      return false;
    }
    return target.props.children.props.children;
  }

  _mapMarkedRoutes() {
    var node = null;
    var children = [this];

    while ((node = children.shift()) !== undefined) {
      var newChildren = this._getChildren(node);

      if (newChildren !== false) {
        children = children.concat(newChildren);
      }

      for (var routeName in this.markedRoutes) {
        var route = this.markedRoutes[routeName];
        if (node.type == route.type) {
          this.markedRoutes[routeName].props = node.props;
          break;
        }
      }
    }
  }

  getHomeRoute() {
    return this.markedRoutes.home.props;
  }

  getLoginRoute() {
    return this.markedRoutes.login.props;
  }

  getLogoutRoute() {
    return this.markedRoutes.logout.props;
  }
}

export class HomeRoute extends Route {
}

export class LoginRoute extends Route {
}