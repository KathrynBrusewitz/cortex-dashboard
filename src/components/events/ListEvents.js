import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, Divider, Button, Row, Col, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import Stat from '../shared/Stat';

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
        sorter: (a, b) => a.title.localeCompare(b.title),
      }, {
        title: 'Date Start',
        dataIndex: 'dateStart',
        key: 'dateStart',
        render: (text, record) => moment(text).format('MMMM D YYYY, h:mm a'),
        sorter: (a, b) => moment(a.dateStart).diff(moment(b.dateStart)),
      }, {
        title: 'Date End',
        dataIndex: 'dateEnd',
        key: 'dateEnd',
        render: (text, record) => moment(text).format('MMMM D YYYY, h:mm a'),
        sorter: (a, b) => moment(a.dateEnd).diff(moment(b.dateEnd)),
      }, {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        sorter: (a, b) => a.location.localeCompare(b.location),
      }, {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => (
          <span>
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
              <a href={null}>Delete</a>
            </Popconfirm>
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
        <Table 
          dataSource={this.props.events} 
          columns={this.getColumns()} 
          expandedRowRender={(record) => (
            <div>
              <h2><Link to={record.url}>{record.url}</Link></h2>
              <h2>Description</h2>
              <p>{record.description}</p>
            </div>
          )} 
          loading={this.props.isGettingEvents || this.props.isDeletingEvent} 
          rowKey={record => record._id} 
        />
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
