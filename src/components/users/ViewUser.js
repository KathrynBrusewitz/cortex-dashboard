import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Row, Divider, Popconfirm } from 'antd';
import Loading from '../shared/Loading';
import Avatar from '../shared/Avatar';

import { usersActions } from '../../actions';

class ViewUser extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isDeletingUser) {
      this.props.history.push('/users');
    }
  }

  render() {
    const { user, isGettingUser } = this.props;
    if (isGettingUser) {
      return (
        <Loading text="Loading User..." />
      );
    }
    if (!user) {
      return (
        <div>
          <h1>User Not Found</h1>
        </div>
      )
    }
    return (
      <div>
        <Row type="flex" justify="end">
          <Link to={`/users/${user._id}/edit`}>Edit</Link>
          { (this.props.currentUser._id !== user._id) &&
            <span>
              <Divider type="vertical" />
              <Popconfirm
                title="Are you sure delete this user?"
                onConfirm={() => {
                  this.props.deleteUser(user._id);
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <a href={null}>Delete</a>
              </Popconfirm>
            </span>
          }
        </Row>
        <Row>
          <h1><Avatar name={user.name} /> {user.name}</h1>
        </Row>
        <div style={{ marginBottom: 16 }}>
          <h2>
            Email: {user.email}
          </h2>
          <h2> 
            Role: {user.role}
          </h2>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  isGettingUser: state.users.isGettingUser,
  isDeletingUser: state.users.isDeletingUser,
  currentUser: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser: usersActions.getUser,
  deleteUser: usersActions.deleteUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);