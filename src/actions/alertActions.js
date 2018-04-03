import { message } from 'antd';

// Types
export const alertConstants = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR'
};

// Creators
export const alertActions = {
  success,
  error,
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

function clear() {
  return { type: alertConstants.CLEAR };
}
