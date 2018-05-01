import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EventForm from './EventForm';
import Loading from '../shared/Loading';

import { eventsActions } from '../../actions';

class EditEvent extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  render() {
    const { updateEvent, isUpdatingEvent, event, isGettingEvent } = this.props;

    if (isGettingEvent) {
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
        <EventForm onSubmit={updateEvent} loading={isUpdatingEvent} edit={true} event={event} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isUpdatingEvent: state.events.isUpdatingEvent,
  isGettingEvent: state.events.isGettingEvent,
  event: state.events.event,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateEvent: eventsActions.updateEvent,
  getEvent: eventsActions.getEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
