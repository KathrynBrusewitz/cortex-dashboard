import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import Loading from '../shared/Loading';

import { usersActions } from '../../actions';
import Avatar from '../dashboard/Avatar';

class ViewUser extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    if (this.props.isGettingUser) {
      return (
        <Loading text="Loading User..." />
      );
    }
    if (!this.props.user) {
      return (
        <div>
          <h1>User Not Found</h1>
        </div>
      )
    }
    return (
      <div>
        <Row>
          <h1><Avatar name={this.props.user.name} /> {this.props.user.name}</h1>
        </Row>
        <div style={{ marginBottom: 16 }}>
          <Row>
            Email: {this.props.user.email}
          </Row>
          <Row> 
            Role: {this.props.user.role}
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  isGettingUser: state.users.isGettingUser,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getUser: usersActions.getUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewUser);