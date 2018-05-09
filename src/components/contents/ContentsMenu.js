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

export default connect(mapStateToProps)(ContentsMenu);