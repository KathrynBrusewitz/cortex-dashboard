import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';

const items = [
  { type: 'pie-chart', name: 'Analytics' },
  { type: 'profile', name: 'Articles' },
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
        style={{ background: '#fff'}}
      >
        <div className="logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['0']}>
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
