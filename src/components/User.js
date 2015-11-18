import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import UserStore from '../stores/UserStore';

export default class User extends React.Component {
  state = {
    user: {}
  };

  componentDidMount() {
    var self = this;

    var assertState = function () {
      UserStore.resolveSession(function (err, user) {
        self.setState({ user: user });
      });
    }

    UserStore.addChangeListener(assertState);

    assertState();
  }

  render() {
    var user = this.state.user || {};

    if (Object.keys(user).length > 0) {
      return (
        <div className='user'>
          <h3>{user.fullName} ({user.username})</h3>
          <p>Href: {user.href}</p>
          <p>Email: {user.email}</p>
          <p>Status: {user.status}</p>
        </div>
      );
    } else {
      return (
        <div className='user'>No user data present.</div>
      );
    }
  }
}
