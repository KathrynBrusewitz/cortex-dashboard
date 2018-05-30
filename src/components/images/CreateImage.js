import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ImageForm from './ImageForm';
import Loading from '../shared/Loading';

import { imagesActions } from '../../actions';
import { usersActions } from '../../actions';

class CreateImage extends Component {
  componentDidMount() {
    this.props.getUsers({ roles: [ 'admin', 'writer', 'artist' ] });
  }

  render() {
    const { createImage, isCreatingImage, users, isGettingUsers } = this.props;

    if (isGettingUsers) {
      return (
        <Loading text="Loading Form..." />
      );

    }

    if (!users) {
      return (
        <p>
          Form unavailable. Need artists in userbase.
        </p>
      );
    }

    return (
      <div>
        <h1>Upload Artwork</h1>
        <ImageForm onSubmit={createImage} loading={isCreatingImage} artistOptions={users} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingImage: state.images.isCreatingImage,
  isGettingUsers: state.users.isGettingUsers,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createImage: imagesActions.createImage,
  getUsers: usersActions.getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateImage);
