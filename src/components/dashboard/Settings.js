import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';

import { alertActions } from '../../actions';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Cortex Settings</h1>
        <p>Nothing here yet.</p>
        <Button onClick={() => this.props.success('success!')}>Test Alert</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...alertActions,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
