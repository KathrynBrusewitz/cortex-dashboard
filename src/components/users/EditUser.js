import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserForm from './UserForm';
import Loading from '../shared/Loading';

import { usersActions } from '../../actions';

class EditUser extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    const { updateUser, isUpdatingUser, user, isGettingUser } = this.props;

    if (isGettingUser) {
      return (
        <Loading text="Loading Form..." />
      );

    }

    if (!user) {
      return (
        <p>
          Form unavailable. User does not exist.
        </p>
      );
    }

    return (
      <div>
        <h1>Update User</h1>
        <UserForm onSubmit={updateUser} loading={isUpdatingUser} edit={true} user={user} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isUpdatingUser: state.users.isUpdatingUser,
  isGettingUser: state.users.isGettingUser,
  user: state.users.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser: usersActions.updateUser,
  getUser: usersActions.getUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
