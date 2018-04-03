import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Button } from 'antd';
import { authActions } from '../../actions';

class Landing extends Component {
  render() {
    const { login } = this.props;
    
    return (
      <Layout>
        <Layout.Content>
          <Button onClick={() => login('email', 'password')}>Log In</Button>
        </Layout.Content>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...authActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(Landing);
