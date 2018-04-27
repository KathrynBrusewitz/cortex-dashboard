import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Icon, Row, Col } from 'antd';
import DropdownMenu from './DropdownMenu';
import Avatar from './Avatar';

import { menuActions } from '../../actions';

class Dashboard extends Component {
  toggleMenu = () => {
    this.props.openMenu(!this.props.menuOpen);
  }

  render() {
    return (
      <Layout.Header style={{ background: '#fff', padding: '0px initial 0px 0px'}}>
        <Row type="flex" justify="space-between" align="middle">
          <Icon
            className='trigger'
            type={this.props.menuOpen ? 'menu-fold': 'menu-unfold'}
            onClick={this.toggleMenu}
          />
          <Col>
            <span style={{ marginRight: 8 }}>{this.props.user.name}</span>
            <DropdownMenu>
              <Avatar name={this.props.user.name} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
