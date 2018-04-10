import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';

class Stat extends Component {
  render() {
    const { stat, icon, tooltip } = this.props;

    if (tooltip) {
      return (
        <Tooltip title={tooltip}>
          {stat} <Icon type={icon} />  
        </Tooltip>
      );
    } else {
      return (
        <span>
          {stat} <Icon type={icon} />  
        </span>
      );
    }
  }
}

export default Stat;
