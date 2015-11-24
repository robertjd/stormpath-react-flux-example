import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import UserStore from '../stores/UserStore';

export default class User extends React.Component {
  onChangeListener = null;

  state = {
    user: {}
  };

  constructor() {
    super();
  }

  onChange() {
    var self = this;
    UserStore.resolveSession(function (err, user) {
      if (self.onChangeListener !== null) {
        self.setState({ user: user });
      }
    });
  }

  componentDidMount() {
    this.onChangeListener = this.onChange.bind(this);
    UserStore.addChangeListener(this.onChangeListener);
    this.onChange();
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChangeListener);
    this.onChangeListener = null;
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
