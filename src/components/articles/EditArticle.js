import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleForm from './ArticleForm';
import Loading from '../shared/Loading';

import { contentActions, imagesActions, usersActions} from '../../actions';

class EditArticle extends Component {
  componentDidMount() {
    this.props.getUsers({ roles: [ 'admin', 'writer', 'artist' ] });
    this.props.getContent(this.props.match.params.id);
    this.props.getImages();
  }

  render() {
    const { updateContent, isUpdatingContent, users, isGettingUsers, isGettingContent, content, isGettingImages, images } = this.props;

    if (isGettingUsers || isGettingContent || isGettingImages) {
      return (
        <Loading text="Loading Form..." />
      );

    }

    if (!users || !content) {
      return (
        <p>
          Form unavailable. Error occurred while loading users and content.
        </p>
      );
    }

    return (
      <div>
        <h1>Edit Article</h1>
        <ArticleForm onSubmit={updateContent} loading={isUpdatingContent} creatorOptions={users} edit={true} content={content} imageOptions={images} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isUpdatingContent: state.content.isUpdatingContent,
  isGettingContent: state.content.isGettingContent,
  isGettingUsers: state.users.isGettingUsers,
  isGettingImages: state.images.isGettingImages,
  images: state.images.images,
  users: state.users.users,
  content: state.content.content,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateContent: contentActions.updateContent,
  getUsers: usersActions.getUsers,
  getContent: contentActions.getContent,
  getImages: imagesActions.getImages,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
