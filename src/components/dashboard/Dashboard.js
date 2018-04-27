import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import CreateArticle from '../articles/CreateArticle';
import CreateVideo from '../videos/CreateVideo';
import CreatePodcast from '../podcasts/CreatePodcast';
import CreateEvent from '../events/CreateEvent';

import EditArticle from '../articles/EditArticle';
import EditVideo from '../videos/EditVideo';
import EditPodcast from '../podcasts/EditPodcast';
import EditGlossary from '../glossary/EditGlossary';
import EditEvent from '../events/EditEvent';

import ListArticles from '../articles/ListArticles';
import ListVideos from '../videos/ListVideos';
import ListPodcasts from '../podcasts/ListPodcasts';
import ListUsers from '../users/ListUsers';
import ListGlossary from '../glossary/ListGlossary';
import ListEvents from '../events/ListEvents';

import ViewArticle from '../articles/ViewArticle';
import ViewVideo from '../videos/ViewVideo';
import ViewPodcast from '../podcasts/ViewPodcast';
import ViewUser from '../users/ViewUser';
import ViewEvent from '../events/ViewEvent';

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
          <Layout.Content className='dashboard-content'>
            <Switch>
              <Route exact path="/" component={Analytics} />

              <Route exact path="/articles" component={ListArticles} />
              <Route exact path="/articles/new" component={CreateArticle} />
              <Route exact path="/articles/:id" component={ViewArticle} />
              <Route exact path="/articles/:id/edit" component={EditArticle} />

              <Route exact path="/videos" component={ListVideos} />
              <Route exact path="/videos/new" component={CreateVideo} />
              <Route exact path="/videos/:id" component={ViewVideo} />
              <Route exact path="/videos/:id/edit" component={EditVideo} />

              <Route exact path="/podcasts" component={ListPodcasts} />
              <Route exact path="/podcasts/new" component={CreatePodcast} />
              <Route exact path="/podcasts/:id" component={ViewPodcast} />
              <Route exact path="/podcasts/:id/edit" component={EditPodcast} />

              <Route exact path="/users" component={ListUsers} />
              <Route exact path="/users/:id" component={ViewUser} />

              <Route exact path="/glossary" component={ListGlossary} />
              <Route exact path="/glossary/edit" component={EditGlossary} />

              <Route exact path="/events" component={ListEvents} />
              <Route exact path="/events/new" component={CreateEvent} />
              <Route exact path="/events/:id" component={ViewEvent} />
              <Route exact path="/events/:id/edit" component={EditEvent} />
              <Route component={DeadEnd}/>
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
