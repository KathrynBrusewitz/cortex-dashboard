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
  
  GET_INVITES_REQUEST: 'GET_INVITES_REQUEST',
  GET_INVITES_SUCCESS: 'GET_INVITES_SUCCESS',
  GET_INVITES_FAILURE: 'GET_INVITES_FAILURE',

  DELETE_INVITE_REQUEST: 'DELETE_INVITE_REQUEST',
  DELETE_INVITE_SUCCESS: 'DELETE_INVITE_SUCCESS',
  DELETE_INVITE_FAILURE: 'DELETE_INVITE_FAILURE',

};

// Creators
export const usersActions = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,

  inviteUser,
  getInvites,
  deleteInvite,
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
      dispatch(failure());
      dispatch(alertActions.error(error.response.data.message));
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
      dispatch(failure());
      dispatch(alertActions.error(error.response.data.message));
    });
  };

  function request() { return { type: usersConstants.GET_USER_REQUEST } }
  function success(payload) { return { type: usersConstants.GET_USER_SUCCESS, payload } }
  function failure() { return { type: usersConstants.GET_USER_FAILURE } }
}

function createUser(fields) {
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
      dispatch(failure());
      dispatch(alertActions.error(error.response.data.message));
    });
  };

  function request() { return { type: usersConstants.CREATE_USER_REQUEST } }
  function success() { return { type: usersConstants.CREATE_USER_SUCCESS } }
  function failure() { return { type: usersConstants.CREATE_USER_FAILURE } }
}

function updateUser(fields, id) {
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
      dispatch(alertActions.error(error.response.data.message));
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
      dispatch(failure());
      dispatch(alertActions.error(error.response.data.message));
    });
  };

  function request() { return { type: usersConstants.DELETE_USER_REQUEST } }
  function success() { return { type: usersConstants.DELETE_USER_SUCCESS } }
  function failure() { return { type: usersConstants.DELETE_USER_FAILURE } }
}

function inviteUser(fields = {}) {
  if (!fields.email || !fields.roles) {
    return dispatch => {
      dispatch(alertActions.error('Email and roles are required to invite user.'));
    };
  }
  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/codes/invites',
      baseURL,
      data: {
        ...fields
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/users/invites'));
        dispatch(alertActions.success(`Sent an invite to ${fields.email}`));
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

  function request() { return { type: usersConstants.INVITE_USER_REQUEST } }
  function success() { return { type: usersConstants.INVITE_USER_SUCCESS } }
  function failure() { return { type: usersConstants.INVITE_USER_FAILURE } }
}

function getInvites({ q } = {}) {
  const query = qs.stringify({ q });

  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/codes/invites?${query}`,
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
      dispatch(failure());
      dispatch(alertActions.error(error.response.data.message));
    });
  };

  function request() { return { type: usersConstants.GET_INVITES_REQUEST } }
  function success(invites) { return { type: usersConstants.GET_INVITES_SUCCESS, invites } }
  function failure() { return { type: usersConstants.GET_INVITES_FAILURE } }
}

function deleteInvite(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'delete',
      url: `/codes/invites/${id}`,
      baseURL,
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(alertActions.success(`Deleted invite with id: ${id}`));
        dispatch(getInvites());
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

  function request() { return { type: usersConstants.DELETE_USER_REQUEST } }
  function success() { return { type: usersConstants.DELETE_USER_SUCCESS } }
  function failure() { return { type: usersConstants.DELETE_USER_FAILURE } }
}