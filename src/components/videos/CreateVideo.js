import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VideoForm from './VideoForm';

import { videoActions } from '../../actions';

class CreateVideo extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(options = {}) {
    // console.log(this.props.formValues);
    // this.props.createVideo(this.props.formValues);
  }

  render() {
    return (
      <div>
        <h1>Create New Video</h1>
        <VideoForm initialValues={{}} onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...videoActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(CreateVideo);
