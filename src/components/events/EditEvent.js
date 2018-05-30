import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EventForm from './EventForm';
import Loading from '../shared/Loading';

import { eventsActions, imagesActions } from '../../actions';

class EditEvent extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
    this.props.getImages();
  }

  render() {
    const { updateEvent, isUpdatingEvent, event, isGettingEvent, isGettingImages, images } = this.props;

    if (isGettingEvent || isGettingImages) {
      return (
        <Loading text="Loading Form..." />
      );

    }

    if (!event) {
      return (
        <p>
          Form unavailable. Error occurred while loading event.
        </p>
      );
    }

    return (
      <div>
        <h1>Update Event</h1>
        <EventForm onSubmit={updateEvent} loading={isUpdatingEvent} edit={true} event={event} imageOptions={images} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isUpdatingEvent: state.events.isUpdatingEvent,
  isGettingEvent: state.events.isGettingEvent,
  isGettingImages: state.images.isGettingImages,
  images: state.images.images,
  event: state.events.event,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateEvent: eventsActions.updateEvent,
  getEvent: eventsActions.getEvent,
  getImages: imagesActions.getImages,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
