import React, { Component } from "react";
import { Avatar as AntAvatar } from 'antd';

// {...this.props} is needed to accept other possible props e.g. onClick events

class Avatar extends Component {
  render() {
    return (
      <AntAvatar {...this.props} style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} shape="square" className='user-avatar'>
        KB
      </AntAvatar>
    );
  }
}

export default Avatar;
