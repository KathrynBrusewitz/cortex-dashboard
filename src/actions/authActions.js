import { alertActions } from './';
import axios from 'axios';

const baseURL = 'http://localhost:8080/api/';

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
function login({ email, password }) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/authenticate',
      baseURL,
      data: {
        email,
        password,
        entry: 'dash',
      }
    })
    .then(res => {
      if (res.data.success) {
        const user = res.data;
        dispatch(success(res.data));
        dispatch(alertActions.success(`Welcome ${res.data.name}!`));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure(error));
      dispatch(alertActions.error(error.message));
    });
  };

  function request() { return { type: authConstants.LOGIN_REQUEST } }
  function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
  function failure() { return { type: authConstants.LOGIN_FAILURE } }
}

function logout() {
  return { type: authConstants.LOGOUT };
}
