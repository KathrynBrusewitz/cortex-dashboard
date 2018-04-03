import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';

const items = [
  { type: 'pie-chart', name: 'Analytics' },
  { type: 'profile', name: 'Articles' }, //copy, file-text
  { type: 'sound', name: 'Podcasts' },
  { type: 'play-circle', name: 'Videos' },
  { type: 'bars', name: 'Glossary' },
  { type: 'calendar', name: 'Events' },
  { type: 'user', name: 'Users' },
  { type: 'shop', name: 'Store' },
];

const menuItems = () => (
  items.map((item, i) => (
    <Menu.Item key={i.toString()}>
      <Icon type={item.type} />
      <span>{item.name}</span>
    </Menu.Item>
  ))
);

class Sider extends Component {
  render() {
    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={!this.props.menuOpen}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
          {menuItems()}
        </Menu>
      </Layout.Sider>
    );
  }
};

const mapStateToProps = state => ({
  menuOpen: state.menu.open,
});

export default connect(mapStateToProps)(Sider);
