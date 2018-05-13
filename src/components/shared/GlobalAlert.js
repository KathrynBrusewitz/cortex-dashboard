import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

// antd.messages are methods
const AntAlert = (type, text) => {
  switch (type) {
    case 'success':
      return message.success(text);
    case 'error':
      return message.error(text);
    case 'warning':
      return message.warning(text);
    case 'info':
      return message.info(text);
    default:
      return null;
  }
};

// Only pushes message if alert state changed and exists
class GlobalAlert extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.alert !== this.props.alert) {
      if (this.props.alert) {
        AntAlert(this.props.alert.type, this.props.alert.message);
      }
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(GlobalAlert);
