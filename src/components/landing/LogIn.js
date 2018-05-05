import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import LoginForm from './LoginForm';

import { authActions } from '../../actions';

class LogIn extends Component {
  render() {
    const { login, isLoggingIn } = this.props;

    return (
      <Row className="gradient-bg" type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
        <Col type="flex" align="middle">
          <Row >
            <h1 style={{ color: "#fff"}}>Log In</h1>
          </Row>
          <Row className="login-form-wrap">
            <LoginForm onSubmit={login} loading={isLoggingIn} />
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  isLoggingIn: state.auth.isLoggingIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...authActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);