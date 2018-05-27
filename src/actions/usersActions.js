import { push } from 'react-router-redux';
import { alertActions } from './';
import axios from 'axios';
import qs from 'qs';
import { baseURL, cookies } from '../constants';

// Types
export const usersConstants = {
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_FAILURE: 'GET_USERS_FAILURE',
  
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',

  CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',

  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',

  DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE: 'DELETE_USER_FAILURE',

  INVITE_USER_REQUEST: 'INVITE_USER_REQUEST',
  INVITE_USER_SUCCESS: 'INVITE_USER_SUCCESS',
  INVITE_USER_FAILURE: 'INVITE_USER_FAILURE',
};

// Creators
export const usersActions = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  inviteUser,
};

// Implementations
function getUsers({ q, roles } = {}) {
  const query = qs.stringify({ q, roles });

  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/users?${query}`,
      baseURL,
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success(res.data.payload));
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

  function request() { return { type: usersConstants.GET_USERS_REQUEST } }
  function success(users) { return { type: usersConstants.GET_USERS_SUCCESS, users } }
  function failure() { return { type: usersConstants.GET_USERS_FAILURE } }
}

function getUser(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/users/${id}`,
      baseURL,
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success(res.data.payload));
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

  function request() { return { type: usersConstants.GET_USER_REQUEST } }
  function success(payload) { return { type: usersConstants.GET_USER_SUCCESS, payload } }
  function failure() { return { type: usersConstants.GET_USER_FAILURE } }
}

function createUser(fields) {
  if (!fields.name || !fields.email || !fields.password || !fields.role) {
    return dispatch => {
      dispatch(alertActions.error('User is missing required fields.'));
    };
  }

  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/users',
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/users'));
        dispatch(alertActions.success(`New user created: "${fields.name}"`));
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

  function request() { return { type: usersConstants.CREATE_USER_REQUEST } }
  function success() { return { type: usersConstants.CREATE_USER_SUCCESS } }
  function failure() { return { type: usersConstants.CREATE_USER_FAILURE } }
}

function updateUser(fields, id) {
  if (!fields.name) {
    return dispatch => {
      dispatch(alertActions.error('User is missing name'));
    };
  }
  return dispatch => {
    dispatch(request());

    axios({
      method: 'put',
      url: `/users/${id}`,
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/users'));
        dispatch(alertActions.success(`Updated user ${fields.name}`));
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

  function request() { return { type: usersConstants.UPDATE_USER_REQUEST } }
  function success() { return { type: usersConstants.UPDATE_USER_SUCCESS } }
  function failure() { return { type: usersConstants.UPDATE_USER_FAILURE } }
}

function deleteUser(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'delete',
      url: `/users/${id}`,
      baseURL,
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(alertActions.success(`Deleted user with id: ${id}`));
        dispatch(getUsers());
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

  function request() { return { type: usersConstants.DELETE_USER_REQUEST } }
  function success() { return { type: usersConstants.DELETE_USER_SUCCESS } }
  function failure() { return { type: usersConstants.DELETE_USER_FAILURE } }
}

function inviteUser(fields = {}) {
  if (!fields.email || !fields.role) {
    return dispatch => {
      dispatch(alertActions.error('Email and role is required to invite user.'));
    };
  }
  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/users/invite',
      baseURL,
      data: {
        ...fields
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/users'));
        dispatch(alertActions.success(`Sent an invite to ${fields.email}`));
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

  function request() { return { type: usersConstants.INVITE_USER_REQUEST } }
  function success() { return { type: usersConstants.INVITE_USER_SUCCESS } }
  function failure() { return { type: usersConstants.INVITE_USER_FAILURE } }
}