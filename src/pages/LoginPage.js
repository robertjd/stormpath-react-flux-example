import React from 'react';
import DocumentTitle from 'react-document-title';

import Login from '../components/Login';

export default class LoginPage extends React.Component {
  render() {
    var redirectTo = this.props.route.redirectTo || '/';
    return (
      <DocumentTitle title={`Login`}>
        <div>
          <h3>Login</h3>
          <Login redirectTo={redirectTo} />
        </div>
      </DocumentTitle>
    );
  }
}
