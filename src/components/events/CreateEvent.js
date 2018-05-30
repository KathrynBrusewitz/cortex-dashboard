import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EventForm from './EventForm';
import Loading from '../shared/Loading';

import { eventsActions, imagesActions } from '../../actions';

class CreateEvent extends Component {
  componentDidMount() {
    this.props.getImages();
  }

  render() {
    const { createEvent, isCreatingEvent, isGettingImages, images } = this.props;

    if (isCreatingEvent || isGettingImages) {
      return (
        <Loading text="Loading Form..." />
      );
    }

    return (
      <div>
        <h1>Create New Event</h1>
        <EventForm onSubmit={createEvent} loading={isCreatingEvent} imageOptions={images || []} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingEvent: state.events.isCreatingEvent,
  isGettingImages: state.images.isGettingImages,
  images: state.images.images,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createEvent: eventsActions.createEvent,
  getImages: imagesActions.getImages,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
