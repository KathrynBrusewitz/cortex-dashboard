import { push } from 'react-router-redux';
import { alertActions } from './';
import axios from 'axios';
import Cookies from 'universal-cookie';
import queryString from 'query-string';

const baseURL = 'http://localhost:8080/api/';
const cookies = new Cookies();
const token = cookies.get('token');

// Types
export const usersConstants = {
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  GET_USERS_FAILURE: 'GET_USERS_FAILURE',
  
  GET_USER_REQUEST: 'GET_USER_REQUEST',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',

  UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',

  DELETE_USER_REQUEST: 'DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE: 'DELETE_USER_FAILURE',
};

// Creators
export const usersActions = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

// Implementations
function getUsers(filters = {}) {
  const query = queryString.stringify(filters);

  // want my query to be of form:
  // filters = { _id: this.article.creators }

  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/users?${query}`,
      baseURL,
      headers: {'x-access-token': token},
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
      dispatch(alertActions.error('Unable to Get Users'));
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
      headers: {'x-access-token': token},
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
      dispatch(alertActions.error('Unable to Get User'));
    });
  };

  function request() { return { type: usersConstants.GET_USER_REQUEST } }
  function success(payload) { return { type: usersConstants.GET_USER_SUCCESS, payload } }
  function failure() { return { type: usersConstants.GET_USER_FAILURE } }
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
      headers: {'x-access-token': token},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/users'));
        dispatch(alertActions.success('Successfully updated!'));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure(error));
      dispatch(alertActions.error('Unable to update user'));
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
      headers: {'x-access-token': token},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(alertActions.success('Successfully deleted!'));
        dispatch(getUsers());
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure(error));
      dispatch(alertActions.error('Unable to delete user'));
    });
  };

  function request() { return { type: usersConstants.DELETE_USER_REQUEST } }
  function success() { return { type: usersConstants.DELETE_USER_SUCCESS } }
  function failure() { return { type: usersConstants.DELETE_USER_FAILURE } }
}
