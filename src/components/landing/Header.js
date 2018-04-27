import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Icon, Row, Col } from 'antd';

class Header extends Component {
  render() {
    return (
      <Layout.Header style={{ background: '#fff', padding: '0px initial 0px 0px'}}>
        <Row type="flex" justify="space-between" align="middle">
          <Icon type="api" style={{ fontSize: 50 }} />
          <Col>
            LogIn SignUp
          </Col>
        </Row>
      </Layout.Header>
    ); 
  }
}

export default Header;