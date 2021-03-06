import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import CreateArticle from '../articles/CreateArticle';
import ViewArticle from '../articles/ViewArticle';
import EditArticle from '../articles/EditArticle';
import ListArticles from '../articles/ListArticles';

import CreateVideo from '../videos/CreateVideo';
import ViewVideo from '../videos/ViewVideo';
import EditVideo from '../videos/EditVideo';
import ListVideos from '../videos/ListVideos';

import CreatePodcast from '../podcasts/CreatePodcast';
import ViewPodcast from '../podcasts/ViewPodcast';
import EditPodcast from '../podcasts/EditPodcast';
import ListPodcasts from '../podcasts/ListPodcasts';
import ContentsMenu from './ContentsMenu';

import DeadEnd from "../shared/DeadEnd";

import CreateImage from "../images/CreateImage";
import ViewImage from "../images/ViewImage";
import EditImage from "../images/EditImage";
import ListImages from '../images/ListImages';

class ContentDetailsLayout extends Component {
  render() {
    return (
      <Layout.Content style={{ width: 700, margin: '0 auto' }}>
        <Switch>
          {/* Details Layout Routes */}
          <Route exact path="/contents/articles/new" component={CreateArticle} />
          <Route exact path="/contents/articles/:id" component={ViewArticle} />
          <Route exact path="/contents/articles/:id/edit" component={EditArticle} />

          <Route exact path="/contents/videos/new" component={CreateVideo} />
          <Route exact path="/contents/videos/:id" component={ViewVideo} />
          <Route exact path="/contents/videos/:id/edit" component={EditVideo} />

          <Route exact path="/contents/podcasts/new" component={CreatePodcast} />
          <Route exact path="/contents/podcasts/:id" component={ViewPodcast} />
          <Route exact path="/contents/podcasts/:id/edit" component={EditPodcast} />

          <Route exact path="/contents/artwork/new" component={CreateImage} />
          <Route exact path="/contents/artwork/:id" component={ViewImage} />
          <Route exact path="/contents/artwork/:id/edit" component={EditImage} />

          {/* No Matching Route */}
          <Route component={DeadEnd} />
        </Switch>
      </Layout.Content>
    );
  }
}

class ContentsLayout extends Component {
  render() {
    return (
      <Layout>
        <ContentsMenu />
        <Layout.Content style={{ padding: '20px', background: '#fff' }}>
          <Switch>
            {/* Redirects */}
            <Redirect exact from='/contents' to='/contents/articles'/>

            {/* Contents Layout Routes */}
            <Route exact path="/contents/articles" component={ListArticles} />
            <Route exact path="/contents/videos" component={ListVideos} />
            <Route exact path="/contents/podcasts" component={ListPodcasts} />
            <Route exact path="/contents/artwork" component={ListImages} />

            {/* No Matching Route */}
            <Route component={ContentDetailsLayout} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }
}

export default ContentsLayout;