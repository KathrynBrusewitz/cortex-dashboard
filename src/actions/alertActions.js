import { message } from 'antd';

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
  message.success(text);
  return { type: alertConstants.SUCCESS, text };
}

function error(text) {
  message.error(text);
  return { type: alertConstants.ERROR, text };
}

function warning(text) {
  message.warning(text);
  return { type: alertConstants.WARNING, text };
}

function info(text) {
  message.info(text);
  return { type: alertConstants.INFO, text };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
