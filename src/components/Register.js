import React from 'react';

export default class Register extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    errorMessage: ''
  }

  onFormSubmit() {
    e.preventDefault();

    var setState = this.setState.bind(this);

    UserStore.register(this.state, function (err, result) {
      if (err) {
        setState({ errorMessage: err.message });
      } else {
        console.log("Registration succeeded!", result);
      }
    });
  }

  onEmailChanged(e) {
    this.state.email = e.target.value;
  }

  onUsernameChanged(e) {
    this.state.username = e.target.value;
  }

  onPasswordChanged(e) {
    this.state.password = e.target.value;
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
          <p>
            <input type='submit' value='Register' />
          </p>
        </form>
      </div>
    );
  }
}