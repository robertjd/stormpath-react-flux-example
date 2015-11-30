import React from 'react';
import DocumentTitle from 'react-document-title';

import ResetPasswordForm from '../components/ResetPasswordForm';

export default class ResetPasswordPage extends React.Component {
  render() {
    var redirectTo = this.props.route.redirectTo || '/';
    return (
      <DocumentTitle title={`Login`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>Forgot Password</h3>
              <hr />
            </div>
          </div>
          <ResetPasswordForm redirectTo={redirectTo} />
        </div>
      </DocumentTitle>
    );
  }
}
