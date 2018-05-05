import React, { Component } from 'react';
import { Popover } from 'antd';
import Avatar from './Avatar';

class AvatarList extends Component {
  render() {
    return (
      <span>
        {this.props.users.map((user) => {
          return (
            <Popover content={user.name} key={user._id}>
              <Avatar name={user.name} size="small" style={{ marginRight: '5px' }}/>
            </Popover>
          );
        })}
      </span>
    );
  }
}

export default AvatarList;
