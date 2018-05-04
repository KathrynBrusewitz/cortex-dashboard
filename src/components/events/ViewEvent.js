import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Tag, Button, Row, Col, Divider, Popconfirm } from 'antd';

import { eventsActions } from '../../actions';
import Loading from '../shared/Loading';
import Stat from '../shared/Stat';

class ViewEvent extends Component {
  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingEvent) {
      this.props.history.push('/events');
    }
  }

  render() {
    const { event, isGettingEvent } = this.props;

    if (isGettingEvent) {
      return (
        <Loading text="Loading Event..." />
      );
    }
    if (!event) {
      return (
        <div>
          <h1>Event Not Found</h1>
        </div>
      );
    }

    return this.props.isLoadingEvent ? (
      <Loading text="Loading Event" />
    ) : (
      <div>
        <Row type="flex" justify="end">
          <Link to={`/events/${event._id}/edit`}>Edit</Link>
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this event?"
            onConfirm={() => {
              this.props.deleteEvent(this.props.match.params.id);
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Stat stat={28} icon="smile-o" tooltip="28 going" />
        </Row>
        <h1>{event.title}</h1>
        <h3>Location: {event.location}</h3>
        <p>{event.description && event.description}</p>
        <h3>Date Start: {event.dateStart}</h3>
        <h3>Date End: {event.dateEnd}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.events.event,
  isGettingEvent: state.events.isGettingEvent,
  isDeletingEvent: state.events.isDeletingEvent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getEvent: eventsActions.getEvent,
  deleteEvent: eventsActions.deleteEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);