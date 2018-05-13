import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';

class Marketing extends Component {
  render() {
    return (
      <div>
        <Row className="gradient-bg" type="flex" justify="center" align="middle" style={{ height: '800px' }}>
          <Col type="flex" align="middle">
            <Row>
              <Icon type="api" className="login-logo" />
              <h1 style={{ color: '#fff' }}>Cortex Dashboard</h1>
              <h2 style={{ color: '#fff' }}>Open Source CMS</h2>
            </Row>
          </Col>
        </Row>
        <Row style={{ padding: 80, backgroundColor: '#fff' }}>
          <h1>Manage Content</h1>
          <Row type="flex" justify="space-between" align="middle">
            <Col>
              <Row>
                <p>Articles</p>
              </Row>
            </Col>
            <Col>
              <Row>
                <p>Podcasts and Videos</p>
              </Row>
            </Col>
            <Col>
              <Row>
                <p>Glossary</p>
              </Row>
            </Col>
          </Row>
        </Row>
        <Row style={{ padding: 80, backgroundColor: '#fff' }}>
          <h1>Full-Stack Open Source</h1>
          <p>inspirational marketing words and stuff</p>
        </Row>
        <Row style={{ padding: 80, backgroundColor: '#fff' }}>
          <h1>maybe put contact here</h1>
        </Row>
      </div>
    );
  }
}

export default Marketing;
