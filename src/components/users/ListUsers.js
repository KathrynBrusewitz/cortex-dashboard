import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Button, Row, Col, Popconfirm } from 'antd';
import Loading from '../shared/Loading';

import { usersActions } from '../../actions';

class ListUsers extends Component {
  rehydrateState() {
    this.props.getUsers();
  }

  componentDidMount() {
    this.rehydrateState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingUser) {
      this.rehydrateState();
    }
  }

  getColumns() {
    return (
      [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      }, {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
      }, {
        title: 'Roles',
        dataIndex: 'roles',
        key: 'roles',
        render: (text, record) => record.roles.map(r => `${r} `)
      }, {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Link to={`/users/userbase/${record._id}`}>View</Link>
            <Divider type="vertical" />
            <Link to={`/users/userbase/${record._id}/edit`}>Edit</Link>
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
    if (this.props.isGettingUsers || this.props.isDeletingUser) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <h1>Userbase</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Link to="/users/userbase/new">
                <Button type="primary">
                  Create New User
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table 
          dataSource={this.props.users} 
          columns={this.getColumns()} 
          loading={this.props.isGettingUsers || this.props.isDeletingUser} 
          rowKey={record => record._id} 
        />
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