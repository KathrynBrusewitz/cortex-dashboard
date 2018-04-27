import { alertActions } from './';
import axios from 'axios';
import Cookies from 'universal-cookie';

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
};

// Creators
export const usersActions = {
  getUsers,
  getUser,
};

// Implementations
function getUsers() {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: '/users',
      baseURL,
      headers: {'x-access-token': token},
    })
    .then(res => {
      if (res.data) {
        dispatch(success(res.data));
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
  console.log(id);
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/users/${id}`,
      baseURL,
      headers: {'x-access-token': token},
    })
    .then(res => {
      if (res.data) {
        dispatch(success(res.data));
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
  function success(user) { return { type: usersConstants.GET_USER_SUCCESS, user } }
  function failure() { return { type: usersConstants.GET_USER_FAILURE } }
}