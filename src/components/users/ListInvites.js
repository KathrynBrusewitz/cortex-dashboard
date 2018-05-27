import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Popconfirm } from 'antd';
import Loading from '../shared/Loading';

import { usersActions } from '../../actions';

class ListInvites extends Component {
  rehydrateState() {
    this.props.getInvites();
  }

  componentDidMount() {
    this.rehydrateState();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isDeletingInvite) {
      this.rehydrateState();
    }
  }

  getColumns() {
    return (
      [{
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
            <Popconfirm
              title="Delete this invite?"
              onConfirm={() => {
                this.props.deleteInvite(record._id);
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
    if (this.props.isGettingInvites || this.props.isDeletingInvite) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        <h1>Invites</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              <Link to="/users/invites/new">
                <Button type="primary">
                  Invite New User
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table 
          dataSource={this.props.invites} 
          columns={this.getColumns()} 
          loading={this.props.isGettingInvites || this.props.isDeletingInvite} 
          rowKey={record => record._id} 
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  invites: state.users.invites,
  isGettingInvites: state.users.isGettingInvites,
  isDeletingInvite: state.users.isDeletingInvite,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getInvites: usersActions.getInvites,
  deleteInvite: usersActions.deleteInvite,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListInvites);