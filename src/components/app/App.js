import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { history } from '../../Store';

import Dashboard from '../dashboard/Dashboard';
import Landing from '../landing/Landing';

class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          { 
            // this.props.user 
            true
            ? <Route path="/" component={Dashboard} />
            : <Route path="/" component={Landing} />
          }
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
