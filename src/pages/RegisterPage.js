import React from 'react';

import Register from '../components/Register';
import DocumentTitle from 'react-document-title';

export default class RegisterPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`Registration Page!`}>
        <div>
          <h3>Register</h3>
          <Register />
        </div>
      </DocumentTitle>
    );
  }
}