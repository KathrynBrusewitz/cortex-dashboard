import { authConstants } from '../actions';

const AUTH_INITIAL = {};

export const authReducer = (state = AUTH_INITIAL, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        user: action.user,
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    case authConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
