import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Icon } from 'antd';

import { menuActions } from '../../actions';

class Dashboard extends Component {
  toggleMenu = () => {
    this.props.openMenu(!this.props.menuOpen);
  }

  render() {
    return (
      <Layout.Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className='trigger'
          type={this.props.menuOpen ? 'menu-fold': 'menu-unfold'}
          onClick={this.toggleMenu}
        />
      </Layout.Header>
    );
  }
}

const mapStateToProps = state => ({
  menuOpen: state.menu.open,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openMenu: menuActions.open,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
