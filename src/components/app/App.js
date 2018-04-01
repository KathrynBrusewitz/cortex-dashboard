import React from 'react';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../../Store';
import Dashboard from '../dashboard/Dashboard';
import Landing from '../landing/Landing';

const loggedIn = localStorage.getItem('user');

const App = () => (
  <ConnectedRouter history={history}>
    <div>
      { loggedIn 
        ? <Route path="/" component={Dashboard} />
        : <Route path="/" component={Landing} />
      }
    </div>
  </ConnectedRouter>
);

export default App;
