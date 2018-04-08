import React, { Component } from 'react';
import { Table, Divider, Button, Row, Col } from 'antd';

const dataSource = [];
for (let i = 0; i < 46; i++) {
  if (Math.round(Math.random()) < 0.5) {
    dataSource.push({
      key: i,
      name: `Reader ${i}`,
      email: `user${i}@gmail.com`,
      role: 'Reader',
    });
  } else if (Math.round(Math.random()) < 0.5) {
    dataSource.push({
      key: i,
      name: `Writer ${i}`,
      email: `writer${i}@gmail.com`,
      role: 'Writer',
    });
  } else {
    dataSource.push({
      key: i,
      name: `Admin ${i}`,
      email: `admin${i}@uw.edu`,
      role: 'Admin',
    });
  }
}

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
}, {
  title: 'Role',
  dataIndex: 'role',
  key: 'role',
}, {
  title: 'Actions',
  dataIndex: 'actions',
  key: 'actions',
  render: (text, record) => (
    <span>
      <a href="/users">View</a>
      <Divider type="vertical" />
      <a href="/users">Delete</a>
    </span>
  ),
}];

class ListUsers extends Component {
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
        <h1>Users</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Button
                type="primary"
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
              >
                Email
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} users` : ''}
              </span>
            </Col>
            <Col>
            <Button
              type="primary"
            >
              Invite New User
            </Button>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default ListUsers;
