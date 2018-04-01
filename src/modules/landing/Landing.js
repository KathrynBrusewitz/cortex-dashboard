import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Layout, Row, Col, Form, Button } from 'antd';
import LoginForm from './LoginForm';

class Landing extends Component {
  render() {
    return (
      <Layout>
        <Layout.Content style={{ background: '#fff' }}>
          <Row type="flex" justify="space-around" align="middle" style={{height:'80vh'}}>
            <LoginForm/>
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

export default Landing;
