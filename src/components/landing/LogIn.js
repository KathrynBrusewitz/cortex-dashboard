import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';

import { alertActions } from '../../actions';

class LogIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>LogIn</h1>
        <Button onClick={() => this.props.success('success!')}>Show Alert</Button>
        {/* <Row className="gradient-bg" type="flex" justify="center" align="middle">
            <Col type="flex" align="middle">
              <Row>
                <Icon type="api" className="login-logo" />
              </Row>
              <Row className="login-form-wrap">
                <LoginForm onSubmit={login} loading={isLoggingIn} />
              </Row>
            </Col>
          </Row> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...alertActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
