import React from 'react';

import LoginLink from './LoginLink';

export default class ResetPassword extends React.Component {
  state = {
    fields: {
      email: ''
    },

    isFormSubmitted: false,
    errorMessage: null
  };

  onFormSubmit(e) {
    e.preventDefault();
  }

  onEmailChanged(e) {
    this.state.fields.email = e.target.value;
  }

  render() {
    return (
      <div className="row">
        { this.state.isFormSubmitted ?
          <div className="col-sm-offset-4 col-xs-12 col-sm-4">
            <p className="alert alert-success">
              We have sent a password reset link to the email address of the account that you specified.
              Please check your email for this message, then click on the link.
            </p>
            <p className="pull-right">
              <LoginLink>Back to Login</LoginLink>
            </p>
            <div ng-show="requestFailed" className="alert alert-danger">
              Sorry, there was a problem with that email or username.  Please try again.
            </div>
          </div>
        :
          <div className="col-xs-12">
            <form className="form-horizontal" onSubmit={this.onFormSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="spEmail" className="col-xs-12 col-sm-4 control-label">Email or Username</label>
                <div className="col-xs-12 col-sm-4">
                  <input className="form-control" id="spEmail" onChange={this.onEmailChanged.bind(this)} placeholder="Your Email Address" ng-disabled="posting" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-4 col-xs-12">
                  { this.state.errorMessage ?
                    <p className="text-danger" ng-show="error" ng-bind="error"></p>
                  : null }
                  <button type="submit" className="btn btn-primary" ng-disabled="posting">Request Password Reset</button>
                </div>
              </div>
            </form>
          </div>
        }
      </div>
    );
  }
}