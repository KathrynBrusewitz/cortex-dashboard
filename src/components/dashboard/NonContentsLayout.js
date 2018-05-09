import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import CreateTerm from '../terms/CreateTerm';
import EditTerm from '../terms/EditTerm';
import ListTerms from '../terms/ListTerms';

import CreateEvent from '../events/CreateEvent';
import ViewEvent from '../events/ViewEvent';
import EditEvent from '../events/EditEvent';
import ListEvents from '../events/ListEvents';

import ViewUser from '../users/ViewUser';
import EditUser from '../users/EditUser';
import ListUsers from '../users/ListUsers';

import Analytics from '../analytics/Analytics';
import DeadEnd from '../shared/DeadEnd';

import Settings from './Settings';

// Dashboard Layout Routes are put inside it's own Layout because we want to
// pad all pages except the Contents Layout, whose menu should remain full-width.

class NonContentsLayout extends Component {
  render() {
    return (
      <Layout style={{ padding: '20px', background: '#fff' }}>
        <Switch>
          <Route exact path="/analytics" component={Analytics} />
          <Route exact path="/settings" component={Settings} />

          <Route exact path="/users" component={ListUsers} />
          <Route exact path="/users/:id" component={ViewUser} />
          <Route exact path="/users/:id/edit" component={EditUser} />

          <Route exact path="/terms" component={ListTerms} />
          <Route exact path="/terms/new" component={CreateTerm} />
          <Route exact path="/terms/:id/edit" component={EditTerm} />

          <Route exact path="/events" component={ListEvents} />
          <Route exact path="/events/new" component={CreateEvent} />
          <Route exact path="/events/:id" component={ViewEvent} />
          <Route exact path="/events/:id/edit" component={EditEvent} />

          {/* No Matching Route */}
          <Route component={DeadEnd}/>
        </Switch>
      </Layout>
    );
  }
}

export default NonContentsLayout;
