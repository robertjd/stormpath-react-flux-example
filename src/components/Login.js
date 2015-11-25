import React from 'react';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';

import UserActions from '../actions/UserActions';

@ReactMixin.decorate(History)
export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    isProcessing: false,
    errorMessage: null
  }

  onFormSubmit(e) {
    var self = this;
    var redirectTo = this.props.redirectTo || '/';

    e.preventDefault();
    self.setState({ isProcessing: true });

    UserActions.login({
      username: this.state.username,
      password: this.state.password
    }, function (err, result) {
      self.setState({ isProcessing: false });

      if (err) {
        self.setState({ errorMessage: err.message });
      } else {
        self.history.pushState(null, redirectTo);
      }
    });
  }

  onUsernameChanged(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChanged(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className='login'>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <p>
            <label htmlFor='username'>Username</label>
            <input id='username' name='username' type='text' onChange={this.onUsernameChanged.bind(this)} />
          </p>
          <p>
            <label htmlFor='password'>Password</label>
            <input id='password' name='password' type='password' onChange={this.onPasswordChanged.bind(this)} />
          </p>
          { this.state.errorMessage === null ?
            null : <p>{this.state.errorMessage}</p>
          }
          <p>
            <input type='submit' value='Login' disabled={this.state.isProcessing} />
          </p>
        </form>
      </div>
    );
  }
}