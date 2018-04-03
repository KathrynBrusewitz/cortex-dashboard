import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../../Store';

import Dashboard from '../dashboard/Dashboard';
import Landing from '../landing/Landing';

const loggedIn = false;

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          { loggedIn 
            ? <Route path="/" component={Dashboard} />
            : <Route path="/" component={Landing} />
          }
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
