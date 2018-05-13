import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserForm from './UserForm';
import Loading from '../shared/Loading';

import { usersActions } from '../../actions';

class CreateUser extends Component {
  render() {
    const { createUser, isCreatingUser } = this.props;

    if (isCreatingUser) {
      return (
        <Loading text="Loading Form..." />
      );

    }

    return (
      <div>
        <h1>Create New User</h1>
        <UserForm
          onSubmit={createUser}
          loading={isCreatingUser}
          isCreateForm={true}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isCreatingUser: state.users.isCreatingUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  createUser: usersActions.createUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
