import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleForm from './ArticleForm';
import Loading from '../shared/Loading';

import { contentActions, imagesActions, usersActions } from '../../actions';

class CreateArticle extends Component {
  componentDidMount() {
    this.props.getUsers({ roles: [ 'admin', 'writer', 'artist' ] });
    this.props.getImages();
  }

  render() {
    const { createContent, isCreatingContent, users, isGettingUsers, isGettingImages, images } = this.props;

    if (isGettingUsers || isGettingImages) {
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
        <h1>Create New Article</h1>
        <ArticleForm onSubmit={createContent} loading={isCreatingContent} creatorOptions={users} imageOptions={images} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingContent: state.content.isCreatingContent,
  isGettingUsers: state.users.isGettingUsers,
  isGettingImages: state.images.isGettingImages,
  images: state.images.images,
  users: state.users.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createContent: contentActions.createContent,
  getUsers: usersActions.getUsers,
  getImages: imagesActions.getImages,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
