import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title';
import { Authenticated } from '../components/Stormpath';

export default class App extends React.Component {
  render() {
    return (
      <DocumentTitle title='Stormpath React+Flux Example'>
        <div className='App'>
          <Link to={`/home`}>Home</Link>
          &nbsp;|&nbsp;<Link to={`/register`}>Register</Link>
          <Authenticated>&nbsp;|&nbsp;<Link to={`/logout`}>Logout</Link></Authenticated><hr />
          {this.props.children}
        </div>
      </DocumentTitle>
    );
  }
}