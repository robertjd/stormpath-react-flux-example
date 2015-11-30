import React from 'react';
import { Link } from 'react-router';

import { SharedContext } from './Stormpath';

export default class LoginLink extends React.Component {
  render() {
    var router = SharedContext.getInstance().router;

    var loginRoute = router.getLoginRoute();
    var targetPath = loginRoute ? loginRoute.path : '/login';

  	return (
      <Link to={targetPath} className={this.props.className}>
        { this.props.children ? this.props.children : 'Login'}
      </Link>
  	);
  }
}