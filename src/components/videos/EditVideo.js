import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VideoForm from './VideoForm';

import { videoActions } from '../../actions';
import Loading from '../shared/Loading';

class EditVideo extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.videoId);
    // this.props.loadVideo(this.props.videoId);
  }

  onFormSubmit(options = {}) {
    // console.log(this.props.formValues);
    // this.props.updateVideo(this.props.videoId, this.props.formValues);
  }

  render() {
    return this.props.isLoadingVideo ? (
      <Loading text="Retrieving Video" />
    ) : (
      <div>
        <h1>Edit Video</h1>
        <VideoForm initialValues={this.props.video} onSubmit={this.onFormSubmit} edit />
      </div>
    );
  }
}

// expects videoId

const mapStateToProps = state => ({
  // video: state.videos.video,
  // isLoadingVideo: state.videos.video.isLoading,
  // formValues: state.form.videoForm || {},
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...videoActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditVideo);
