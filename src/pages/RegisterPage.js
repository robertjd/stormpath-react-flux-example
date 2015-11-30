import React from 'react';
import DocumentTitle from 'react-document-title';

import RegistrationForm from '../components/RegistrationForm';

export default class RegisterPage extends React.Component {
  render() {
    var redirectTo = this.props.route.redirectTo || '/';
    return (
      <DocumentTitle title={`Registration Page!`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>Registration</h3>
              <hr />
            </div>
          </div>
          <RegistrationForm redirectTo={redirectTo} />
        </div>
      </DocumentTitle>
    );
  }
}