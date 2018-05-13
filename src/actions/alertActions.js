import { notification } from 'antd';

const config = (message, description) => ({
  message,
  description,
  placement: 'bottomLeft',
});

// Types
export const alertConstants = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  WARNING: 'ALERT_WARNING',
  INFO: 'ALERT_INFO',
  CLEAR: 'ALERT_CLEAR'
};

// Creators
export const alertActions = {
  success,
  error,
  warning,
  info,
  clear
};

// Implementations
function success(text) {
  notification.success(config('Success', text));
  return { type: alertConstants.SUCCESS, text };
}

function error(text) {
  notification.error(config('Error', text));
  return { type: alertConstants.ERROR, text };
}

function warning(text) {
  notification.warning(config('Warning', text));
  return { type: alertConstants.WARNING, text };
}

function info(text) {
  notification.info(config('Info', text));
  return { type: alertConstants.INFO, text };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
