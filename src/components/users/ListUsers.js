import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Button, Row, Col, Popconfirm } from 'antd';
import Loading from '../shared/Loading';

import { usersActions } from '../../actions';

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

  getColumns() {
    return (
      [{
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
            <Link to={`/users/${record._id}/edit`}>Edit</Link>
            <Divider type="vertical" />
            { (this.props.currentUser._id !== record._id) &&
              <Popconfirm
                title="Are you sure delete this user?"
                onConfirm={() => {
                  this.props.deleteUser(record._id);
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <a href={null}>Delete</a>
              </Popconfirm>
            }
          </span>
        ),
      }]
    );
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
              <Button>
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
        <Table rowSelection={rowSelection} dataSource={this.props.users} columns={this.getColumns()} loading={this.props.isGettingUsers || this.props.isDeletingUser} rowKey={record => record._id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  isGettingUsers: state.users.isGettingUsers,
  isDeletingUser: state.users.isDeletingUser,
  currentUser: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers: usersActions.getUsers,
  deleteUser: usersActions.deleteUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);