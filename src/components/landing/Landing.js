import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Layout, Row, Col, Form, Button } from 'antd';

class Landing extends Component {
  render() {
    return (
      <Layout>
        <Layout.Content>
          <Row type="flex" justify="space-around" align="middle" style={{height:'80vh'}}>
            Landing Page (Login / About Cortex)
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

export default Landing;
