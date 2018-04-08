import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const items = [
  { icon: 'pie-chart', name: 'Analytics', route: '/' },
  { icon: 'profile', name: 'Articles', route: '/articles' },
  { icon: 'sound', name: 'Podcasts', route: '/podcasts' },
  { icon: 'play-circle', name: 'Videos', route: '/videos' },
  { icon: 'bars', name: 'Glossary', route: '/glossary' },
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

class Sider extends Component {
  getMenuKey() {
    const key = items.findIndex(item => (item.route === this.props.location.pathname));
    // antd.Menu.defaultSelectedKeys only accepts an array of strings
    return [key.toString()];
  }

  render() {
    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={!this.props.menuOpen}
        style={{ background: '#fff'}}
      >
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={this.getMenuKey()}>
          {menuItems}
        </Menu>
      </Layout.Sider>
    );
  }
};

const mapStateToProps = state => ({
  menuOpen: state.menu.open,
  location: state.router.location,
});

export default connect(mapStateToProps)(Sider);
