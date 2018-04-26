import { alertActions } from './';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseURL = 'http://localhost:8080/api/';
const cookies = new Cookies();

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
      if (res.data.token) {
        dispatch(success(res.data));
        dispatch(alertActions.success(`Welcome ${res.data.name}!`));
        cookies.set('token', res.data.token, { path: '/' });
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
  cookies.remove('token', { path: '/' });
  return dispatch => {
    dispatch(alertActions.success(`Logged Out!`));
    dispatch(success());
  };

  function success() { return { type: authConstants.LOGOUT } }
}
