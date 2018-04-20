import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EventForm from './EventForm';

import { eventActions } from '../../actions';
import Loading from '../shared/Loading';

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    // console.log(this.props.eventId);
    // this.props.loadEvent(this.props.eventId);
  }

  onFormSubmit(options = {}) {
    // console.log(this.props.formValues);
    // this.props.updateEvent(this.props.eventId, this.props.formValues);
  }

  render() {
    return this.props.isLoadingEvent ? (
      <Loading text="Retrieving Event" />
    ) : (
      <div>
        <h1>Edit Event</h1>
        <EventForm initialValues={this.props.event} onSubmit={this.onFormSubmit} edit />
      </div>
    );
  }
}

// expects eventId

const mapStateToProps = state => ({
  // event: state.events.event,
  // isLoadingEvent: state.events.event.isLoading,
  // formValues: state.form.eventForm || {},
});

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...eventActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
