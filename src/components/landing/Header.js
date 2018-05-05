import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Layout, Icon, Row, Col } from 'antd';

class Header extends Component {
  render() {
    return (
      <Layout.Header style={{ background: '#fff', padding: '0px initial 0px 0px'}}>
        <Row type="flex" justify="space-between" align="middle">
          <Col>
            <Link to="/" style={{ fontSize: 40, color: "#000" }}>
              <Icon type="api" />
            </Link>
          </Col>
          <Col>
            <Link to="/login" style={{ marginRight: 8 }}>
                Log In
            </Link>
            <Link to="/signup">
                Sign Up
            </Link>
          </Col>
        </Row>
      </Layout.Header>
    ); 
  }
}

export default Header;