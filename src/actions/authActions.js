import { push } from 'react-router-redux';
import { alertActions } from './';
import axios from 'axios';
import { baseURL, cookies } from '../constants';

// Types
export const authConstants = {
  GETME_REQUEST: 'AUTH_GETME_REQUEST',
  GETME_SUCCESS: 'AUTH_GETME_SUCCESS',
  GETME_FAILURE: 'AUTH_GETME_FAILURE',

  LOGIN_REQUEST: 'AUTH_LOGIN_REQUEST',
  LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',

  TOKEN_LOGIN_REQUEST: 'AUTH_TOKEN_LOGIN_REQUEST',
  TOKEN_LOGIN_SUCCESS: 'AUTH_TOKEN_LOGIN_SUCCESS',
  TOKEN_LOGIN_FAILURE: 'AUTH_TOKEN_LOGIN_FAILURE',

  SIGNUP_REQUEST: 'AUTH_SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'AUTH_SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'AUTH_SIGNUP_FAILURE',

  LOGOUT: 'AUTH_LOGOUT',
};

// Creators
export const authActions = {
  login,
  tokenLogin,
  logout,
  signup,
  getMe,
};

// Implementations
function getMe() {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: '/me',
      baseURL,
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success(res.data.payload));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
        // Remove token because current user is not authenticated
        cookies.remove('token', { path: '/' });
      }
    })
    .catch(error => {
      dispatch(failure());
      dispatch(alertActions.error(error.response.data.message));
      // Remove token because current user is not authenticated
      cookies.remove('token', { path: '/' });
    });
  };

  function request() { return { type: authConstants.GETME_REQUEST } }
  function success(user) { return { type: authConstants.GETME_SUCCESS, user } }
  function failure() { return { type: authConstants.GETME_FAILURE } }
}

function login({ email, password }) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/login',
      baseURL,
      data: {
        email,
        password,
        entry: 'dash',
      }
    })
    .then(res => {
      if (res.data.success) {
        cookies.set('token', res.data.token, { path: '/' });
        dispatch(success(res.data.payload));
        dispatch(push('/'));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
        cookies.remove('token', { path: '/' });
      }
    })
    .catch(error => {
      dispatch(failure());
      dispatch(alertActions.error(error.response.data.message));
      cookies.remove('token', { path: '/' });
    });
  };

  function request() { return { type: authConstants.LOGIN_REQUEST } }
  function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
  function failure() { return { type: authConstants.LOGIN_FAILURE } }
}

function tokenLogin() {
  return dispatch => {
    if (!cookies.get('token')) {
      dispatch(failure());
    } else {
      dispatch(request());
      axios({
        method: 'get',
        url: '/decode',
        baseURL,
        headers: {'x-access-token': cookies.get('token')},
      })
      .then(res => {
        if (res.data.success) {
          dispatch(success(res.data.payload));
        } else {
          dispatch(failure());
          // Do not alert failure because this login is automatic by Cortex, not user
          cookies.remove('token', { path: '/' });
        }
      })
      .catch(error => {
        dispatch(failure());
        // Do not alert failure because this login is automatic by Cortex, not user
        cookies.remove('token', { path: '/' });
      });
    }
  };

  function request() { return { type: authConstants.TOKEN_LOGIN_REQUEST } }
  function success(user) { return { type: authConstants.TOKEN_LOGIN_SUCCESS, user } }
  function failure() { return { type: authConstants.TOKEN_LOGIN_FAILURE } }
}

function logout({ goToPage }) {
  cookies.remove('token', { path: '/' });
  return dispatch => {
    dispatch(alertActions.success(`Logged Out!`));
    dispatch(success());
    if (goToPage) {
      dispatch(push(goToPage));
    }
  };

  function success() { return { type: authConstants.LOGOUT } }
}

function signup({ name, email, password, roles }) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/createUser',
      baseURL,
      data: {
        name,
        email,
        password,
        roles,
      }
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/login'));
        dispatch(alertActions.success('Account created! Try logging in now.'));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure());
      dispatch(alertActions.error(error.response.data.message));
    });
  };

  function request() { return { type: authConstants.SIGNUP_REQUEST } }
  function success() { return { type: authConstants.SIGNUP_SUCCESS } }
  function failure() { return { type: authConstants.SIGNUP_FAILURE } }
}