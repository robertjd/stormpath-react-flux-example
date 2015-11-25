import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title';
import { NotAuthenticated, Authenticated } from '../components/Stormpath';

export default class App extends React.Component {
  render() {
    return (
      <DocumentTitle title='Stormpath React+Flux Example'>
        <div className='App'>
          <Authenticated>
            <Link to={`/home`}>Home</Link>
          </Authenticated>
          <NotAuthenticated>
            <Link to={`/login`}>Login</Link>&nbsp;|&nbsp;
            <Link to={`/register`}>Register</Link>
          </NotAuthenticated>
          <Authenticated>
            &nbsp;|&nbsp;<Link to={`/logout`}>Logout</Link>
          </Authenticated>
          <hr />
          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }
}