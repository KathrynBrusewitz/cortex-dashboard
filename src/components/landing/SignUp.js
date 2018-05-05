import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd';
import SignUpForm from './SignUpForm';

import { authActions } from '../../actions';

class SignUp extends Component {
  render() {
    const { signup, isSigningUp } = this.props;

    return (
      <Row className="gradient-bg" type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
        <Col type="flex" align="middle">
          <Row >
            <h1 style={{ color: "#fff"}}>Sign Up</h1>
          </Row>
          <Row className="login-form-wrap">
            <SignUpForm onSubmit={signup} loading={isSigningUp} />
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  isSigningUp: state.auth.isSigningUp,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  signup: authActions.signup,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);