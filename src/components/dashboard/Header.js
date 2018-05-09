import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Layout, Icon, Row, Col } from 'antd';
import DropdownMenu from './DropdownMenu';
import Avatar from '../shared/Avatar';

import { menuActions } from '../../actions';
import HeaderMenu from "./HeaderMenu";

class Header extends Component {
  render() {
    return (
      <Layout.Header theme="dark" style={{ padding: '0px initial 0px 0px'}}>
        <Row type="flex" justify="space-between" align="middle">
          <Col style={{fontSize: 40}}>
            <Link to="/" style={{ lineHeight: '64px', color: "#fff" }}>
              <Icon type="api" />
            </Link>
          </Col>
          <HeaderMenu />
          <Col>
            <span style={{ marginRight: 8, color: '#fff' }}>{this.props.user.name}</span>
            <DropdownMenu>
              <Avatar name={this.props.user.name} style={{ lineHeight: '64px', cursor: 'pointer', backgroundColor: '#666' }} />
            </DropdownMenu>
          </Col>
        </Row>
      </Layout.Header>
    ); 
  }
}

const mapStateToProps = state => ({
  menuOpen: state.menu.open,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openMenu: menuActions.open,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
