import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';
import Breadcrumbs from "./Breadcrumbs";

import ContentsLayout from '../contents/ContentsLayout';
import NonContentsLayout from "./NonContentsLayout";

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

            {/* Layouts */}
            <Route path="/contents" component={ContentsLayout} />
            <Route component={NonContentsLayout} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default DashboardLayout;
