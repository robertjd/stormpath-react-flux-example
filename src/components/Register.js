import React from 'react';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';

import UserActions from '../actions/UserActions';

@ReactMixin.decorate(History)
export default class Register extends React.Component {
  state = {
    fields: {
      email: '',
      username: '',
      password: '',
    },
    isProcessing: false,
    errorMessage: ''
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

  onEmailChanged(e) {
    this.state.fields.email = e.target.value;
  }

  onUsernameChanged(e) {
    this.state.fields.username = e.target.value;
  }

  onPasswordChanged(e) {
    this.state.fields.password = e.target.value;
  }

  render() {
    return (
      <div className='register'>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <p>
            <label htmlFor='email'>Email</label>
            <input id='email' name='email' type='text' onChange={this.onEmailChanged.bind(this)} />
          </p>
          <p>
            <label htmlFor='username'>Username</label>
            <input id='username' name='username' type='text' onChange={this.onUsernameChanged.bind(this)} />
          </p>
          <p>
            <label htmlFor='password'>Password</label>
            <input id='password' name='username' type='password' onChange={this.onPasswordChanged.bind(this)} />
          </p>
          { this.state.errorMessage === null ?
            null : <p>{this.state.errorMessage}</p>
          }
          <p>
            <input type='submit' value='Register' />
          </p>
        </form>
      </div>
    );
  }
}