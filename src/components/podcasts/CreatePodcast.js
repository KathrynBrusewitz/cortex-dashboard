import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PodcastForm from './PodcastForm';

import { podcastActions } from '../../actions';

class CreatePodcast extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(options = {}) {
    // console.log(this.props.formValues);
    // this.props.createPodcast(this.props.formValues);
  }

  render() {
    return (
      <div>
        <h1>Create New Podcast</h1>
        <PodcastForm initialValues={{}} onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...podcastActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(CreatePodcast);
