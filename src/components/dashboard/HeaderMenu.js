import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const items = [
  { icon: 'pie-chart', name: 'Analytics', route: '/analytics' },
  { icon: 'profile', name: 'Contents', route: '/contents' },
  { icon: 'bars', name: 'Terms', route: '/terms' },
  { icon: 'calendar', name: 'Events', route: '/events' },
  { icon: 'user', name: 'Users', route: '/users' },
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

class HeaderMenu extends Component {
  getKey() {
    const key = items.findIndex(item => (this.props.pathname.startsWith(item.route)));
    // antd.Menu.selectedKeys expects type String[]
    return [key.toString()];
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        // defaultSelectedKeys did not work with react-router-dom's <Redirect/>
        selectedKeys={this.getKey()}
      >
        {menuItems}
      </Menu>
  );
  }
};

const mapStateToProps = state => ({
  menuOpen: state.menu.open,
  pathname: state.router.location.pathname,
});

export default connect(mapStateToProps)(HeaderMenu);
