import React, { Component } from "react";
import { Avatar as AntAvatar } from 'antd';

// {...this.props} is needed to accept other possible props e.g. onClick events

class Avatar extends Component {
  render() {
    return (
      <AntAvatar {...this.props} style={{ backgroundColor: '#a5a5a5', verticalAlign: 'middle' }} shape="square" className='user-avatar'>
        K
      </AntAvatar>
    );
  }
}

export default Avatar;
