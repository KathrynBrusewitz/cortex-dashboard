import { authConstants } from '../actions';

const AUTH_INITIAL = {
  user: null,
  isLoggingIn: false,
  isSigningUp: false,
  isGettingMe: false,
};

export const authReducer = (state = AUTH_INITIAL, action) => {
  switch (action.type) {
    case authConstants.GETME_REQUEST:
      return {
        ...state,
        isGettingMe: true,
      };
    case authConstants.GETME_SUCCESS:
      return {
        ...state,
        user: action.user,
        isGettingMe: false,
      };
    case authConstants.GETME_FAILURE:
      return {
        ...state,
        user: null,
        isGettingMe: false,
      };
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
        ...state,
        user: null,
        isLoggingIn: false,
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
        ...state,
        user: null,
        isLoggingIn: false,
      };
    case authConstants.SIGNUP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
      };
    case authConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
      };
    case authConstants.SIGNUP_FAILURE:
      return {
        ...state,
        isSigningUp: false,
      };
    case authConstants.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
