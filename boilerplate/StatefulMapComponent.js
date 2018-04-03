import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';

import { alertActions } from '../../actions';

class StatefulMapComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>StatefulMapComponent</h1>
        <Button onClick={() => this.props.success('success!')}>Show Alert</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(StatefulMapComponent);
