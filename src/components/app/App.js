import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { history } from '../../Store';

import DashboardLayout from '../dashboard/DashboardLayout';
import LandingLayout from '../landing/LandingLayout';

import { authActions } from '../../actions'
import Loading from '../shared/Loading';

class App extends Component {
  // After the <App/> DOM node is first created, the state is fresh and we have no information on the user.

  // First we check if the path includes "/invite"; If so, we want to log the user out and jump to the invite page where they can continue to making a new account with the invite code.
  // Otherwise, we attempt to login with the stored token, if there is any. The tokenLogin() Action will handle either case.
  // <App/> will rerender if state.auth.user changes and login successfully stored a token in cookies.

  // The <App/> is responsible for rendering all Layout Routes. Each Layout is responsible for all their components.
  // <Dashboard/> and <Landing/> define the overall layout of their respective halves of the App and the routes within them.

  // Rendering <Loading/> when logging in prevents any premature renders of the Landing layout and its components.
  // For example, reloading the dashboard will render the Landing's Dead End page for a split second.
  // When moved onto the production server, speeds will be slower than local environment and make this buggy rendering more noticeable.

  componentDidMount() {
    if (this.props.match.path === "/invite") {
      this.props.logout({ goTo: this.props.match.url });
    } else {
      this.props.tokenLogin();
    }
  }

  render() {
    const layout = this.props.user
      ? <Route path="/" component={DashboardLayout} />
      : <Route path="/" component={LandingLayout} />;
    
    return (
      <ConnectedRouter history={history}>
        <div>
          { this.props.isLoggingIn ? <Loading /> : layout }
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoggingIn: state.auth.isLoggingIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  tokenLogin: authActions.tokenLogin,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
