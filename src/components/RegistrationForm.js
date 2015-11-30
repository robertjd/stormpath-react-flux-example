import React from 'react';
import ReactMixin from 'react-mixin';

import LoginLink from '../components/LoginLink';
import UserActions from '../actions/UserActions';

export default class RegistrationForm extends React.Component {
  state = {
    fields: {
      givenName: '',
      surname: '',
      email: '',
      password: ''
    },
    isCreated: false,
    isProcessing: false,
    errorMessage: null
  }

  onFormSubmit(e) {
    e.preventDefault();

    var self = this;
    var redirectTo = this.props.redirectTo || '/';

    self.setState({ isProcessing: true });

    UserActions.register(this.state.fields, function (err, result) {
      if (err) {
        self.setState({
          errorMessage: err.message,
          isProcessing: false
        });
      } else {
        UserActions.login({
          username: self.state.fields.email || self.state.fields.username,
          password: self.state.fields.password
        }, function (err) {
          if (err) {
            self.setState({
              errorMessage: err.message,
              isProcessing: false
            });
          } else {
            self.history.pushState(null, redirectTo);
          }
        })
      }
    });
  }

  onFirstNameChanged(e) {
    this.state.fields.givenName = e.target.value;
  }

  onLastNameChanged(e) {
    this.state.fields.surname = e.target.value;
  }

  onEmailChanged(e) {
    this.state.fields.email = e.target.value;
  }

  onPasswordChanged(e) {
    this.state.fields.password = e.target.value;
  }

  render() {
    return (
      <div className='sp-login-form'>
        <div className="row">
          <div className="col-sm-offset-4 col-xs-12 col-sm-4">
            { this.state.isCreated ? (
              <div>
                <p className="alert alert-success">Your account has been created. <LoginLink>Login Now</LoginLink>.</p>
                <p className="pull-right">
                  <LoginLink>Back to Login</LoginLink>
                </p>
              </div>
              ) : null
            }
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <form className="form-horizontal" ng-hide="created && !authenticating" onSubmit={this.onFormSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="spFirstName" className="col-xs-12 col-sm-4 control-label">First Name</label>
                <div className="col-xs-12 col-sm-4">
                  <input className="form-control" id="spFirstName" placeholder="First Name" disabled={this.state.isProcessing} onChange={this.onFirstNameChanged.bind(this)} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="spLastName" className="col-xs-12 col-sm-4 control-label">Last Name</label>
                <div className="col-xs-12 col-sm-4">
                  <input className="form-control" id="spLastName" placeholder="Last Name" disabled={this.state.isProcessing} onChange={this.onLastNameChanged.bind(this)} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="spEmail" className="col-xs-12 col-sm-4 control-label">Email</label>
                <div className="col-xs-12 col-sm-4">
                  <input className="form-control" id="spEmail" placeholder="Email" disabled={this.state.isProcessing} onChange={this.onEmailChanged.bind(this)} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="spPassword" className="col-xs-12 col-sm-4 control-label">Password</label>
                <div className="col-xs-12 col-sm-4">
                  <input type="password" className="form-control" id="spPassword" placeholder="Password" disabled={this.state.isProcessing} onChange={this.onPasswordChanged.bind(this)} />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-4 col-sm-4">
                  { this.state.errorMessage === null ?
                    null : <p className="alert alert-danger">{this.state.errorMessage}</p>
                  }
                  <button type="submit" className="btn btn-primary" disabled={this.state.isProcessing}>Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}