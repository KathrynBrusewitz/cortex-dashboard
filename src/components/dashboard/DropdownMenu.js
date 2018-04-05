import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Dropdown } from 'antd';
import { authActions } from '../../actions';

class DropdownMenu extends Component {
  handleClick = ({ item }) => {
    if (item.props.action) {
      item.props.action();
    }
  }

  renderMenu() {
    const { logout } = this.props;

    return (
      <Menu onClick={this.handleClick}>
        <Menu.Item key="1">Profile Settings</Menu.Item>
        <Menu.Item key="2">Cortex Settings</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" action={() => logout()}>Log Out</Menu.Item>
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

const mapDispatchToProps = dispatch => bindActionCreators({
  ...authActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(DropdownMenu);
