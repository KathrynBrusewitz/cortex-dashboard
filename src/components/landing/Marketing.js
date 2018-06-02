import React, { Component } from 'react';
import { Row, Col, Icon, Card } from 'antd';

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
          <Row type="flex" justify="center" align="middle" gutter={16}>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card
                bordered={false}
                style={{ fontSize: 100 }}
                cover={<Icon type="pie-chart" />}
              >
                <Card.Meta
                  style={{ textAlign: 'center' }}
                  title={<h1>Track Analytics</h1>}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card
                bordered={false}
                style={{ fontSize: 100 }}
                cover={<Icon type="cloud-upload-o" />}
              >
                <Card.Meta
                  style={{ textAlign: 'center' }}
                  title={<h1>Upload Content</h1>}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card
                bordered={false}
                style={{ fontSize: 100 }}
                cover={<Icon type="smile-o" />}
              >
                <Card.Meta
                  style={{ textAlign: 'center' }}
                  title={<h1>Manage Users</h1>}
                />
              </Card>
            </Col>
          </Row>
        </Row>


        <Row type="flex" justify="center" align="middle" style={{ padding: 40, backgroundColor: '#fff' }}>
        <Col xs={22} sm={15} style={{ fontSize: 25, textAlign: 'center' }}>
          <p>Cortex is an open-source, lightweight, and extensible content-management-system composed of an API, database, and admin dashboard. It is used to easily upload, publish, and manage content and users, as well as support data visualizations, permissions, emails, notifications, and analytics. For more information visit <a href={'https://rimhof.github.io/Grey-Matters/'}>our capstone page.</a></p>
          </Col>
        </Row>
        <Row style={{ padding: 80, backgroundColor: '#fff' }}>
        </Row>
      </div>
    );
  }
}

export default Marketing;
