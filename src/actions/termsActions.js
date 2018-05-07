import { push } from 'react-router-redux';
import { alertActions } from './';
import axios from 'axios';
import Cookies from 'universal-cookie';
import queryString from 'query-string';

const baseURL = 'http://localhost:8080/api/';
const cookies = new Cookies();

// Types
export const termsConstants = {
  GET_TERMS_REQUEST: 'GET_TERMS_REQUEST',
  GET_TERMS_SUCCESS: 'GET_TERMS_SUCCESS',
  GET_TERMS_FAILURE: 'GET_TERMS_FAILURE',

  GET_TERM_REQUEST: 'GET_TERM_REQUEST',
  GET_TERM_SUCCESS: 'GET_TERM_SUCCESS',
  GET_TERM_FAILURE: 'GET_TERM_FAILURE',

  CREATE_TERM_REQUEST: 'CREATE_TERM_REQUEST',
  CREATE_TERM_SUCCESS: 'CREATE_TERM_SUCCESS',
  CREATE_TERM_FAILURE: 'CREATE_TERM_FAILURE',

  UPDATE_TERM_REQUEST: 'UPDATE_TERM_REQUEST',
  UPDATE_TERM_SUCCESS: 'UPDATE_TERM_SUCCESS',
  UPDATE_TERM_FAILURE: 'UPDATE_TERM_FAILURE',

  DELETE_TERM_REQUEST: 'DELETE_TERM_REQUEST',
  DELETE_TERM_SUCCESS: 'DELETE_TERM_SUCCESS',
  DELETE_TERM_FAILURE: 'DELETE_TERM_FAILURE',
};

// Creators
export const termsActions = {
  getTerm,
  getTerms,
  createTerm,
  updateTerm,
  deleteTerm,
};

// Implementations
function getTerms(filters = {}) {
  const query = queryString.stringify(filters);
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/terms?${query}`,
      baseURL,
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
      dispatch(alertActions.error('Unable to Get Terms'));
    });
  };

  function request() { return { type: termsConstants.GET_TERMS_REQUEST } }
  function success(payload) { return { type: termsConstants.GET_TERMS_SUCCESS, payload } }
  function failure() { return { type: termsConstants.GET_TERMS_FAILURE } }
}

function getTerm(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/terms/${id}`,
      baseURL,
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
      dispatch(alertActions.error('Unable to Get Term'));
    });
  };

  function request() { return { type: termsConstants.GET_TERM_REQUEST } }
  function success(payload) { return { type: termsConstants.GET_TERM_SUCCESS, payload } }
  function failure() { return { type: termsConstants.GET_TERM_FAILURE } }
}

function createTerm(fields) {
  if (!fields.term || !fields.description) {
    console.log('Error: Missing term or description');
    return dispatch => {
      dispatch(alertActions.error('Missing term or description'));
    };
  }

  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/terms',
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/terms'));
        dispatch(alertActions.success('Successfully created!'));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure(error));
      dispatch(alertActions.error('Unable to create term'));
    });
  };

  function request() { return { type: termsConstants.CREATE_TERM_REQUEST } }
  function success() { return { type: termsConstants.CREATE_TERM_SUCCESS } }
  function failure() { return { type: termsConstants.CREATE_TERM_FAILURE } }
}

function updateTerm(fields, id) {
  if (!fields.term || !fields.description) {
    console.log('Error: Missing term or description');
    return dispatch => {
      dispatch(alertActions.error('Missing term or description'));
    };
  }

  return dispatch => {
    dispatch(request());

    axios({
      method: 'put',
      url: `/terms/${id}`,
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/terms'));
        dispatch(alertActions.success('Successfully updated!'));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure(error));
      dispatch(alertActions.error('Unable to update term'));
    });
  };

  function request() { return { type: termsConstants.UPDATE_TERM_REQUEST } }
  function success() { return { type: termsConstants.UPDATE_TERM_SUCCESS } }
  function failure() { return { type: termsConstants.UPDATE_TERM_FAILURE } }
}

function deleteTerm(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'delete',
      url: `/terms/${id}`,
      baseURL,
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(alertActions.success('Successfully deleted!'));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure(error));
      dispatch(alertActions.error('Unable to delete term'));
    });
  };

  function request() { return { type: termsConstants.DELETE_TERM_REQUEST } }
  function success() { return { type: termsConstants.DELETE_TERM_SUCCESS } }
  function failure() { return { type: termsConstants.DELETE_TERM_FAILURE } }
}