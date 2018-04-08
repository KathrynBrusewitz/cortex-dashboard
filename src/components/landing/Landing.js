import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Row, Col, Icon } from 'antd';
import LoginForm from './LoginForm';

import { authActions } from '../../actions';

class Landing extends Component {
  render() {
    const { login } = this.props;
    return (
      <Layout>
        <Layout.Content>
          <Row className="gradient-bg" type="flex" justify="center" align="middle">
            <Col type="flex" align="middle">
              <Row>
                <Icon type="api" className="login-logo" />
              </Row>
              <Row className="login-form-wrap">
                
                <LoginForm onSubmit={login} />
              </Row>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...authActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(Landing);
