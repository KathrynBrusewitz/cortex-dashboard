import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import ListArticles from '../articles/ListArticles';
import ListVideos from '../videos/ListVideos';
import ListPodcasts from '../podcasts/ListPodcasts';
import ListUsers from '../users/ListUsers';
import ListGlossary from '../glossary/ListGlossary';
import ListEvents from '../events/ListEvents';
import Analytics from '../analytics/Analytics';
import DeadEnd from '../shared/DeadEnd';
import Header from './Header';
import Sider from './Sider';

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <Sider />
        <Layout>
          <Header />
          <Layout.Content>
            <Switch>
              <Route exact path="/" component={Analytics} />
              <Route exact path="/articles" component={ListArticles} />
              <Route exact path="/videos" component={ListVideos} />
              <Route exact path="/podcasts" component={ListPodcasts} />
              <Route exact path="/users" component={ListUsers} />
              <Route exact path="/glossary" component={ListGlossary} />
              <Route exact path="/events" component={ListEvents} />
              <Route component={DeadEnd}/>
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
