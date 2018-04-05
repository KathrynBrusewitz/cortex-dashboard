import { alertActions } from './';
import { authService } from '../services';

// Types
export const authConstants = {
  LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',

  LOGOUT: 'AUTH_LOGOUT',
};

// Creators
export const authActions = {
  login,
  logout,
};

// Implementations
function login({ email, password, name }) {
  return dispatch => {
    dispatch(request({ email }));

    const user = authService.login(email, password);
    if (user) {
      // TODO: Use this line when API works
      // dispatch(success(user));
      // TODO: Remove this line when API works
      dispatch(success({ email, name }));
    } else {
      const error = 'Invalid Login'
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };

  function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

function logout() {
  return { type: authConstants.LOGOUT };
}
