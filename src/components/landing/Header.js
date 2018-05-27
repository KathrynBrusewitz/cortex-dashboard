import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Layout, Icon, Row, Col } from 'antd';
import HeaderMenu from "./HeaderMenu";

class Header extends Component {
  render() {
    return (
      <Layout.Header theme="dark" style={{ padding: '0px initial 0px 0px'}}>
        <Row type="flex" justify="space-between" align="middle">
          <Col style={{fontSize: 40}}>
            <Link to="/" style={{ lineHeight: '64px', color: "#fff" }}>
              <Icon type="api" />
            </Link>
          </Col>
          <HeaderMenu />
        </Row>
      </Layout.Header>
    ); 
  }
}

export default Header;