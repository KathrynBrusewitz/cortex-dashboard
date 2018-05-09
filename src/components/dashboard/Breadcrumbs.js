import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { alertActions } from '../../actions';

class Breadcrumbs extends Component {
  render() {
    const { location } = this.props;

    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems = pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {snippet[0].toUpperCase() + snippet.substr(1)}
          </Link>
        </Breadcrumb.Item>
      );
    });

    return (
      <Breadcrumb style={{ padding: '10px' }}>
        {breadcrumbItems}
      </Breadcrumb>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...alertActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumbs);
