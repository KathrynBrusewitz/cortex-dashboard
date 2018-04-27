import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import Loading from '../shared/Loading';

import { usersActions } from '../../actions';

class ViewUser extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  render() {
    // console.log(this.props.);
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
        <h1>{this.props.user.name}</h1>
        <div style={{ marginBottom: 16 }}>
          <Row type="flex" justify="space-between">
            <Col>
              Information about the user goes here.
            </Col>
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