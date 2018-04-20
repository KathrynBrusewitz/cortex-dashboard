import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PodcastForm from './PodcastForm';

import { podcastActions } from '../../actions';
import Loading from '../shared/Loading';

class EditPodcast extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.podcastId);
    // this.props.loadPodcast(this.props.podcastId);
  }

  onFormSubmit(options = {}) {
    // console.log(this.props.formValues);
    // this.props.updatePodcast(this.props.podcastId, this.props.formValues);
  }

  render() {
    return this.props.isLoadingPodcast ? (
      <Loading text="Retrieving Podcast" />
    ) : (
      <div>
        <h1>Edit Podcast</h1>
        <PodcastForm initialValues={this.props.podcast} onSubmit={this.onFormSubmit} edit />
      </div>
    );
  }
}

// expects podcastId

const mapStateToProps = state => ({
  // podcast: state.podcasts.podcast,
  // isLoadingPodcast: state.podcasts.podcast.isLoading,
  // formValues: state.form.podcastForm || {},
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...podcastActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditPodcast);
