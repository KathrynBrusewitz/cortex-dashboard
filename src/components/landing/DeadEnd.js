import React, { Component } from 'react';
import { Row, Col } from 'antd';

class DeadEnd extends Component {
  render() {
    return (
      <Row className="gradient-bg" type="flex" justify="center" align="middle" style={{ height: '100vh' }}>
        <Col type="flex" align="middle">
          <Row >
            <h1 style={{ color: "#fff"}}>This page does not exist.</h1>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default DeadEnd;