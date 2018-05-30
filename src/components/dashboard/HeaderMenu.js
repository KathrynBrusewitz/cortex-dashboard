import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Menu, Icon, Dropdown } from 'antd';

import { authActions } from '../../actions';

class HeaderMenu extends Component {
  getKey() {
    const key = items.findIndex(item => (this.props.pathname.startsWith(item.route)));
    // antd.Menu.selectedKeys expects type String[]
    return [key.toString()];
  }

  render() {
    const { logout, currentUser } = this.props;
  
    const items = [
      { icon: 'pie-chart', name: 'Analytics', route: '/analytics' },
      { icon: 'profile', name: 'Contents', route: '/contents' },
      { icon: 'bars', name: 'Terms', route: '/terms' },
      { icon: 'calendar', name: 'Events', route: '/events' },
      { icon: 'user', name: 'Users', route: '/users' },
      { icon: 'settings', name: 'Profile Settings', route: `/users/userbase/${currentUser._id}` },
      { icon: 'profile', name: 'Log Out', action: () => logout(), route: '/' },
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

    return (
      <div>
        {/* <Dropdown overlay={this.renderMenu()} trigger={['click']}>
          {this.props.children}
        </Dropdown> */}
        <Menu
          className="header-menu-desktop"
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          // defaultSelectedKeys did not work with react-router-dom's <Redirect/>
          selectedKeys={this.getKey()}
        >
          {menuItems}
        </Menu>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  currentUser: state.auth.user,
  menuOpen: state.menu.open,
  pathname: state.router.location.pathname,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...authActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
