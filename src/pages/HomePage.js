import React from 'react';
import DocumentTitle from 'react-document-title';

import User from '../components/User';
import { NotAuthenticated, Authenticated } from '../components/Stormpath';

export default class HomePage extends React.Component {
  render() {
    return (
      <DocumentTitle title={`Home!`}>
        <User />
      </DocumentTitle>
    );
  }
}
