import React, { Component } from "react";
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

const items = [
  { icon: 'profile', name: 'Articles', route: '/contents/articles' },
  { icon: 'sound', name: 'Podcasts', route: '/contents/podcasts' },
  { icon: 'play-circle', name: 'Videos', route: '/contents/videos' },
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

class ContentsMenu extends Component {
  getMenuKey() {
    const key = items.findIndex(item => (item.route === this.props.location.pathname));
    // antd.Menu.defaultSelectedKeys only accepts an array of strings
    return [key.toString()];
  }

  render() {
    return (
      <Menu
        mode="horizontal"
        style={{ lineHeight: '64px' }}
        defaultSelectedKeys={this.getMenuKey()}
      >
        {menuItems}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
});

export default connect(mapStateToProps)(ContentsMenu);