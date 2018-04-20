import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleForm from './ArticleForm';

import { articleActions } from '../../actions';
import Loading from '../shared/Loading';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.articleId);
    // this.props.loadArticle(this.props.articleId);
  }

  onFormSubmit(options = {}) {
    // console.log(this.props.formValues);
    // this.props.updateArticle(this.props.articleId, this.props.formValues);
  }

  render() {
    return this.props.isLoadingArticle ? (
      <Loading text="Retrieving Article" />
    ) : (
      <div>
        <h1>Edit Article</h1>
        <ArticleForm initialValues={this.props.article} onSubmit={this.onFormSubmit} edit />
      </div>
    );
  }
}

// expects articleId

const mapStateToProps = state => ({
  // article: state.articles.article,
  // isLoadingArticle: state.articles.article.isLoading,
  // formValues: state.form.articleForm || {},
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...articleActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditArticle);
