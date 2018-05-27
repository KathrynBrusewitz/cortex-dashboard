import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './Header';

import Marketing from './Marketing';
import LogIn from './LogIn';
import DeadEnd from './DeadEnd';
import Demo from './Demo';

class LandingLayout extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Layout.Content>
          <Switch>
            <Route exact path="/" component={Marketing} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/demo" component={Demo} />
            <Route component={DeadEnd}/>
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default LandingLayout;