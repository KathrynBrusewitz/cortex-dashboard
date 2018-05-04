import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Divider, Button, Row, Col, Calendar, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import Stat from '../shared/Stat';
import Loading from '../shared/Loading';

import { eventsActions } from '../../actions';

class ListEvents extends Component {
  componentDidMount() {
    this.props.getEvents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isDeletingEvent) {
      this.props.getEvents();
    }
  }

  getColumns() {
    return (
      [{
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      }, {
        title: 'Date Start',
        dataIndex: 'dateStart',
        key: 'dateStart',
      }, {
        title: 'Date End',
        dataIndex: 'dateEnd',
        key: 'dateEnd',
      }, {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
      }, {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Link to={`/events/${record._id}`}>View</Link>
            <Divider type="vertical" />
            <Link to={`/events/${record._id}/edit`}>Edit</Link>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this event?"
              onConfirm={() => {
                this.props.deleteEvent(record._id);
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">Delete</a>
            </Popconfirm>
          </span>
        ),
      }, {
        title: 'Stats',
        dataIndex: 'stats',
        key: 'stats',
        render: (text, record) => (
          <span>
            <Stat stat={20} icon="smile-o" tooltip={`${20} going`} />
          </span>
        ),
      }]
    );
  }

  render() {
    return (
      <div>
        <h1>Events</h1>
        {/* <Calendar /> */}
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Link to={'/events/new'}>
                <Button type="primary">
                  Create New Event
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table dataSource={this.props.events} columns={this.getColumns()} loading={this.props.isGettingEvents || this.props.isDeletingEvent} rowKey={record => record._id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
  isGettingEvents: state.events.isGettingEvents,
  isDeletingEvent: state.events.isDeletingEvent,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getEvents: eventsActions.getEvents,
  deleteEvent: eventsActions.deleteEvent,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListEvents);
