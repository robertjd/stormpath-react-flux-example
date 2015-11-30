import React from 'react';
import { Link } from 'react-router';

import { SharedContext } from './Stormpath';

export default class LogoutLink extends React.Component {
  render() {
    var router = SharedContext.getInstance().router;

    var logoutRoute = router.getLogoutRoute();
    var targetPath = logoutRoute ? logoutRoute.path : '/logout';

  	return (
      <Link to={targetPath} className={this.props.className}>
        { this.props.children ? this.props.children : 'Logout'}
      </Link>
  	);
  }
}