import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EventForm from './EventForm';
import Loading from '../shared/Loading';

import { eventsActions } from '../../actions';

class CreateEvent extends Component {
  render() {
    const { createEvent, isCreatingEvent } = this.props;

    if (isCreatingEvent) {
      return (
        <Loading text="Loading Form..." />
      );
    }

    return (
      <div>
        <h1>Create New Event</h1>
        <EventForm onSubmit={createEvent} loading={isCreatingEvent} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingEvent: state.events.isCreatingEvent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createEvent: eventsActions.createEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);
