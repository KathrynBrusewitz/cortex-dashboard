import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleForm from './ArticleForm';

import { contentActions } from '../../actions';

class CreateArticle extends Component {
  render() {
    const { createContent, isCreatingContent } = this.props;

    return (
      <div>
        <h1>Create New Article</h1>
        <ArticleForm initialValues={{}} onSubmit={createContent} loading={isCreatingContent} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingContent: state.content.isCreatingContent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createContent: contentActions.createContent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
