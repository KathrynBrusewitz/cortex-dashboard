import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleForm from './ArticleForm';

import { contentActions } from '../../actions';

class CreateArticle extends Component {
  render() {
    const { createArticle, isCreatingArticle } = this.props;

    return (
      <div>
        <h1>Create New Article</h1>
        <ArticleForm initialValues={{}} onSubmit={createArticle} loading={isCreatingArticle} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingArticle: state.content.isCreatingArticle,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createArticle: contentActions.createArticle,
}, dispatch);

export default connect(null, mapDispatchToProps)(CreateArticle);
