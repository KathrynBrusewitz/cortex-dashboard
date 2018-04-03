import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Layout, Row, Col, Form, Button } from 'antd';
import { alertActions } from '../../actions';

class Landing extends Component {
  testSuccess() {
    this.props.dispatch(alertActions.success('success!'));
  }
  testError() {
    this.props.dispatch(alertActions.error('error!'));
  }

  testClear() {
    this.props.dispatch(alertActions.clear());
  }

  render() {
    return (
      <Layout>
        <Layout.Content>
          <Button onClick={() => this.testSuccess()}>Test Success</Button>
          <Button onClick={() => this.testError()}>Test Error</Button>
          <Button onClick={() => this.testClear()}>Test Clear</Button>
        </Layout.Content>
      </Layout>
    );
  }
}

export default connect()(Landing);
