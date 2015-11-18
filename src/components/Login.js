import React from 'react';
import UserStore from '../stores/UserStore';
import ReactMixin from 'react-mixin';
import { History } from 'react-router';

@ReactMixin.decorate(History)
export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
    isProcessing: false,
    errorMessage: null
  }

  onFormSubmit(e) {
    e.preventDefault();

    var self = this;
    self.setState({ isProcessing: true });

    UserStore.authenticate({
      username: this.state.username,
      password: this.state.password
    }, function (err, result) {
      self.setState({ isProcessing: false });

      if (err) {
        self.setState({ errorMessage: err.message });
      } else {
        self.history.pushState(null, '/home');
      }
    });
  }

  onUsernameChanged(e) {
    this.state.username = e.target.value;
  }

  onPasswordChanged(e) {
    this.state.password = e.target.value;
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