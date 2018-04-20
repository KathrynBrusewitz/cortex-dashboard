import React, { Component } from 'react';
import { Icon, Tooltip } from 'antd';

class HelpTip extends Component {
  render() {
    const title = this.props.tip || 'you can do it!';

    return(
      <Tooltip title={title}>
        <Icon type="question-circle" />
      </Tooltip>
    );
  }
}

export default HelpTip;