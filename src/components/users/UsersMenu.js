import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const items = [
  { icon: 'user', name: 'Userbase', route: '/users/userbase' },
  { icon: 'mail', name: 'User Invites', route: '/users/invites' },
];

const menuItems = (
  items.map((item, i) => (
    <Menu.Item key={i.toString()}>
      <Link to={item.route}>
        <Icon type={item.icon} />
        <span>{item.name}</span>
      </Link>
    </Menu.Item>
  ))
);

class UsersMenu extends Component {
  getKey() {
    const key = items.findIndex(item => (this.props.pathname.startsWith(item.route)));
    // antd.Menu.selectedKeys expects type String[]
    return [key.toString()];
  }

  render() {
    return (
      <Menu
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        // defaultSelectedKeys did not work with react-router-dom's <Redirect/>
        selectedKeys={this.getKey()}
      >
        {menuItems}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(UsersMenu);