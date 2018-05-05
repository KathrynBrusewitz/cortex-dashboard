import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const items = [
  { icon: 'pie-chart', name: 'Analytics', route: '/' },
  { icon: 'profile', name: 'Contents', route: '/contents' },
  // { icon: 'profile', name: 'Articles', route: '/articles' },
  // { icon: 'sound', name: 'Podcasts', route: '/podcasts' },
  // { icon: 'play-circle', name: 'Videos', route: '/videos' },
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
  getMenuKey() {
    const key = items.findIndex(item => (item.route === this.props.location.pathname));
    // antd.Menu.defaultSelectedKeys only accepts an array of strings
    return [key.toString()];
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        defaultSelectedKeys={this.getMenuKey()}
      >
        {menuItems}
      </Menu>
  );
  }
};

const mapStateToProps = state => ({
  menuOpen: state.menu.open,
  location: state.router.location,
});

export default connect(mapStateToProps)(HeaderMenu);
