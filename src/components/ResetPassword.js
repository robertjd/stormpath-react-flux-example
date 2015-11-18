import React from 'react';

export default class ResetPassword extends React.Component {
  render() {
    return (
      <div className='reset-password'>
        <label htmlFor='email'>Email</label>
        <input type='submit' value='Reset Password'>
      </div>
    );
  }
}