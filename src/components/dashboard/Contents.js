import React, { Component } from "react";
import { Tabs, Radio } from 'antd';
import ListArticles from "../articles/ListArticles";
import ListPodcasts from "../podcasts/ListPodcasts";
import ListTerms from "../terms/ListTerms";
import ListVideos from "../videos/ListVideos";

class Contents extends Component {
  render() {
    return (
      <Tabs
        defaultActiveKey="3"
        tabPosition='horizontal'
      >
        <Tabs.TabPane tab="Articles" key="3">
          <ListArticles />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Podcasts" key="4">
          <ListPodcasts />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Videos" key="5">
          <ListVideos />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Artwork" key="6">Content of tab 6</Tabs.TabPane>
        <Tabs.TabPane tab="Glossary" key="7">
          <ListTerms />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

export default Contents;