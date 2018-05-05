import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { history } from '../../Store';

import Dashboard from '../dashboard/Dashboard';
import Landing from '../landing/Landing';

import { authActions } from '../../actions'

class App extends Component {
  componentDidMount() {
    // Browser may have refreshed and store re-initialized
    if (!this.props.user) {
      this.props.tokenLogin();
    }
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div>
          { 
            this.props.user
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

const mapDispatchToProps = dispatch => bindActionCreators({
  tokenLogin: authActions.tokenLogin,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
