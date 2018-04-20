import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArticleForm from './ArticleForm';

import { articleActions } from '../../actions';

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(options = {}) {
    // console.log(this.props.formValues);
    // this.props.createArticle(this.props.formValues);
  }

  render() {
    return (
      <div>
        <h1>Create New Article</h1>
        <ArticleForm initialValues={{}} onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...articleActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(CreateArticle);
