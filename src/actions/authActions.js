import { alertActions } from './';
import { authService } from '../services';

// Types
export const authConstants = {
  LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USER_LOGIN_FAILURE',

  LOGOUT: 'USER_LOGOUT',
};

// Creators
export const authActions = {
  login,
  logout,
};

// Implementations
function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    const user = authService.login(email, password);
    if (user) {
      dispatch(success(user));
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
