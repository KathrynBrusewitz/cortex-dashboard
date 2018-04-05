import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Button } from 'antd';
import { authActions } from '../../actions';

const tempUser = {
  email: 'kathryn.brusewitz@gmail.com',
  password: 'password',
  name: 'Kathryn Brusewitz',
};

class Landing extends Component {
  render() {
    const { login } = this.props;
    
    return (
      <Layout>
        <Layout.Content>
          <Button onClick={() => login(tempUser)}>Log In</Button>
        </Layout.Content>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  ...authActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(Landing);
