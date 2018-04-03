import React, { Component } from "react";
import { Avatar as AntAvatar, Menu, Dropdown } from 'antd';

const menu = (
  <Menu>
    <Menu.Item key="1">Profile Settings</Menu.Item>
    <Menu.Item key="2">Cortex Settings</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Log Out</Menu.Item>
  </Menu>
);

class Avatar extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <AntAvatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} shape="square" className='user-avatar'>
          KB
        </AntAvatar>
      </Dropdown>
    );
  }
}

export default Avatar;
