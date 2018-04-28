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
};

// Creators
export const usersActions = {
  getUsers,
  getUser,
};

// Implementations
function getUsers(filters = {}) {
  const query = queryString.stringify(filters);
  console.log(query);
  // query became { role: { $in: ['admin', 'writer'] }}

  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      // url: '/users?role[]=admin&role[]=writer', // works
      // req.query becomes { role: [ 'admin', 'writer' ] }
      // { role: { $in: ['admin', 'writer'] }}
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
  function success(user) { return { type: usersConstants.GET_USER_SUCCESS, user } }
  function failure() { return { type: usersConstants.GET_USER_FAILURE } }
}