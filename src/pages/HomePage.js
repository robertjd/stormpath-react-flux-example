import React from 'react';
import DocumentTitle from 'react-document-title';

import Login from '../components/Login';
import User from '../components/User';
import { NotAuthenticated, Authenticated } from '../components/Stormpath';

export default class HomePage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`Home!`}>
        <div>
          <Authenticated>
            <User />
          </Authenticated>
          <NotAuthenticated>
            <h3>Login</h3>
            <Login />
          </NotAuthenticated>
        </div>
      </DocumentTitle>
    );
  }
}
