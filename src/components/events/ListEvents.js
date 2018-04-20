import React, { Component } from 'react';
import { Table, Divider, Button, Row, Col, Calendar } from 'antd';
import { Link } from 'react-router-dom';
import Stat from '../shared/Stat';

const dataSource = [];
for (let i = 0; i < 46; i++) {
  dataSource.push({
    key: i,
    name: `Event Name ${i}`,
    description: 'Lorem ipsum dolor sit amet, consectetur...',
    going: Math.round(Math.random() * 100),
  });
}

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
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
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  render: (text, record) => (
    <span>
      <Link to="/events/_id">View</Link>
      <Divider type="vertical" />
      <Link to="/events/_id/edit">Edit</Link>
      <Divider type="vertical" />
      <Link to="/events">Delete</Link>
    </span>
  ),
}, {
  title: 'Stats',
  dataIndex: 'stats',
  key: 'stats',
  render: (text, record) => (
    <span>
      <Stat stat={record.going} icon="smile-o" tooltip={`${record.going} going`} />
    </span>
  ),
}];

class Events extends Component {
  state = {
    selectedRowKeys: [],
    // TODO: Remove after API is hooked up
    loading: false,
  };

  // TODO: Remove after API is hooked up
  start = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <h1>Events</h1>
        <Calendar />
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Button
                type="danger"
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
              >
                Delete
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} events` : ''}
              </span>
            </Col>
            <Col>
              <Link to={'/events/new'}>
                <Button type="primary">
                  Create New Event
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default Events;
