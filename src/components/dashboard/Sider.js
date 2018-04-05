import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const items = [
  { type: 'pie-chart', name: 'Analytics', route: '/' },
  { type: 'profile', name: 'Articles', route: '/articles' },
  { type: 'sound', name: 'Podcasts', route: '/podcasts' },
  { type: 'play-circle', name: 'Videos', route: '/videos' },
  { type: 'bars', name: 'Glossary', route: '/glossary' },
  { type: 'calendar', name: 'Events', route: '/events' },
  { type: 'user', name: 'Users', route: '/users' },
];

const menuItems = (
  items.map((item, i) => (
    <Menu.Item key={i.toString()}>
      <Link to={item.route}>
        <Icon type={item.type} />
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
