import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Button, Row, Col } from 'antd';
import Loading from '../shared/Loading';

import { usersActions } from '../../actions';

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
      <Link to={`/users/${record._id}`}>View</Link>
      <Divider type="vertical" />
      <Link to="/users">Delete</Link>
    </span>
  ),
}];

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    if (this.props.isGettingUsers) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <h1>Users</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Button type="ghost">
                Email
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} users` : ''}
              </span>
            </Col>
            <Col>
              <Button type="primary">
                Invite New User
              </Button>
            </Col>
          </Row>
        </div>
        <Table rowSelection={rowSelection} dataSource={this.props.users} columns={columns} loading={this.props.isGettingUsers} rowKey={record => record._id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  isGettingUsers: state.users.isGettingUsers,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers: usersActions.getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);