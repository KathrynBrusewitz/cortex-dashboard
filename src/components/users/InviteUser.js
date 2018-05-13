import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InviteForm from './InviteForm';

import { usersActions } from '../../actions';

class InviteUser extends Component {
  render() {
    const { inviteUser, isInvitingUser } = this.props;

    return (
      <div>
        <h1>Invite New User</h1>
        <InviteForm
          onSubmit={inviteUser}
          loading={isInvitingUser}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isInvitingUser: state.users.isInvitingUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers: usersActions.getUsers,
  inviteUser: usersActions.inviteUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InviteUser);
