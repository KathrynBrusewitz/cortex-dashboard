import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

import { authActions } from '../../actions';

class DropdownMenu extends Component {
  handleClick = ({ item }) => {
    if (item.props.action) {
      item.props.action();
    }
  }

  renderMenu() {
    const { logout, currentUser } = this.props;

    return (
      <Menu onClick={this.handleClick}>
        <Menu.Item key="1">
          <Link to={`/users/userbase/${currentUser._id}`}>Profile Settings</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/settings">Cortex Settings</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" action={() => logout()}>
          <Link to="/">Log Out</Link>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    return (
      <Dropdown overlay={this.renderMenu()} trigger={['click']}>
        {this.props.children}
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...authActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);
