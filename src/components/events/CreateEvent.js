import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EventForm from './EventForm';

import { eventActions } from '../../actions';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(options = {}) {
    // console.log(this.props.formValues);
    // this.props.createEvent(this.props.formValues);
  }

  render() {
    return (
      <div>
        <h1>Create New Event</h1>
        <EventForm initialValues={{}} onSubmit={this.onFormSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  // ...eventActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(CreateEvent);
