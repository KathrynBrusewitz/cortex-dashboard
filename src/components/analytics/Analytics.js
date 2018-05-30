import React, { Component } from 'react';
import { Card } from 'antd';
import screenshot from './analytics.png'

class Analytics extends Component {
  render() {
    return (
      <div>
        <Card
          bordered={false}
          cover={
          <img alt={'Google Analytics Screenshot'} src={screenshot} />}
        />
      </div>
    );
  }
}

export default Analytics;
