import React, { Component } from 'react';
import { Icon } from 'antd';

class Loading extends Component {
  render() {
    const text = this.props.text || '';
    return (
      <div style={{ textAlign: 'center' }}>
        <h1><Icon type="loading" spin={true} /> {text}</h1>
      </div>
    );
  }
}

export default Loading;
