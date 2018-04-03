import { alertConstants } from '../actions';

const ALERT_INITIAL = {};

export const alertReducer = (state = ALERT_INITIAL, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'success',
        message: action.text
      };
    case alertConstants.ERROR:
      return {
        type: 'error',
        message: action.text
      };
    case alertConstants.WARNING:
      return {
        type: 'warning',
        message: action.text
      };
    case alertConstants.INFO:
      return {
        type: 'info',
        message: action.text
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
