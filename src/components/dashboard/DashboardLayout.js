import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';
import Breadcrumbs from "./Breadcrumbs";

import ContentsLayout from '../contents/ContentsLayout';
import UsersLayout from '../users/UsersLayout';
import StandardLayout from "./StandardLayout";

// Dashboard Layout Routes are put inside it's own Layout because we want to
// pad all pages except the Contents Layout, whose menu should remain full-width.

class DashboardLayout extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Breadcrumbs />
        <Layout.Content style={{ background: '#fff' }}>
          <Switch>
            {/* Redirects */}
            <Redirect exact from='/' to='/analytics'/>
            <Redirect exact from='/articles' to='/contents/articles'/>
            <Redirect exact from='/podcasts' to='/contents/podcasts'/>
            <Redirect exact from='/videos' to='/contents/videos'/>
            <Redirect exact from='/artwork' to='/contents/artwork'/>
            <Redirect exact from='/images' to='/contents/artwork'/>

            {/* Layouts */}
            <Route path="/contents" component={ContentsLayout} />
            <Route path="/users" component={UsersLayout} />
            <Route component={StandardLayout} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default DashboardLayout;
