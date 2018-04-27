import { authConstants } from '../actions';

const AUTH_INITIAL = {
  user: null,
  isLoggingIn: false,
};

export const authReducer = (state = AUTH_INITIAL, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggingIn: false,
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...AUTH_INITIAL,
      };
    case authConstants.TOKEN_LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case authConstants.TOKEN_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggingIn: false,
      };
    case authConstants.TOKEN_LOGIN_FAILURE:
      return {
        ...AUTH_INITIAL,
      };
    case authConstants.LOGOUT:
      return {
        ...AUTH_INITIAL,
      };
    default:
      return state;
  }
}
