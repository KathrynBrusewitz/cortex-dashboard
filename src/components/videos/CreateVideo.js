import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VideoForm from './VideoForm';
import Loading from '../shared/Loading';

import { contentActions } from '../../actions';
import { usersActions } from '../../actions';

class CreateVideo extends Component {
  componentDidMount() {
    this.props.getUsers({ role: [ 'admin', 'writer', 'artist' ] });
  }

  render() {
    const { createContent, isCreatingContent, users, isGettingUsers } = this.props;

    if (isGettingUsers) {
      return (
        <Loading text="Loading Form..." />
      );

    }

    if (!users) {
      return (
        <p>
          Form unavailable. Need admins or writers in userbase.
        </p>
      );
    }

    return (
      <div>
        <h1>Create New Video</h1>
        <VideoForm onSubmit={createContent} loading={isCreatingContent} creatorOptions={users} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingContent: state.content.isCreatingContent,
  isGettingUsers: state.users.isGettingUsers,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createContent: contentActions.createContent,
  getUsers: usersActions.getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateVideo);
