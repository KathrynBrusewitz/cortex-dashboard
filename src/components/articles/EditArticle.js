import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleForm from './ArticleForm';
import Loading from '../shared/Loading';

import { contentActions } from '../../actions';
import { usersActions } from '../../actions';

class EditArticle extends Component {
  componentDidMount() {
    this.props.getUsers({ role: [ 'admin', 'writer' ] });
    this.props.getContent(this.props.match.params.id);
  }

  render() {
    const { updateContent, isUpdatingContent, users, isGettingUsers, isGettingContent, content } = this.props;

    if (isGettingUsers || isGettingContent) {
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
        <ArticleForm onSubmit={updateContent} loading={isUpdatingContent} creatorOptions={users} edit={true} content={content} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isUpdatingContent: state.content.isUpdatingContent,
  isGettingContent: state.content.isGettingContent,
  isGettingUsers: state.users.isGettingUsers,
  users: state.users.users,
  content: state.content.content,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateContent: contentActions.updateContent,
  getUsers: usersActions.getUsers,
  getContent: contentActions.getContent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
