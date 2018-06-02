import { push } from 'react-router-redux';
import { alertActions } from './';
import axios from 'axios';
import qs from 'qs';
import { baseURL, cookies, rules } from '../constants';
import { Value } from 'slate';
import Html from 'slate-html-serializer';

// Create a new serializer instance with our `rules` from above.
const html = new Html({ rules });

// Types
export const contentConstants = {
  GET_CONTENTS_REQUEST: 'GET_CONTENTS_REQUEST',
  GET_CONTENTS_SUCCESS: 'GET_CONTENTS_SUCCESS',
  GET_CONTENTS_FAILURE: 'GET_CONTENTS_FAILURE',

  GET_CONTENT_REQUEST: 'GET_CONTENT_REQUEST',
  GET_CONTENT_SUCCESS: 'GET_CONTENT_SUCCESS',
  GET_CONTENT_FAILURE: 'GET_CONTENT_FAILURE',

  CREATE_CONTENT_REQUEST: 'CREATE_CONTENT_REQUEST',
  CREATE_CONTENT_SUCCESS: 'CREATE_CONTENT_SUCCESS',
  CREATE_CONTENT_FAILURE: 'CREATE_CONTENT_FAILURE',

  UPDATE_CONTENT_REQUEST: 'UPDATE_CONTENT_REQUEST',
  UPDATE_CONTENT_SUCCESS: 'UPDATE_CONTENT_SUCCESS',
  UPDATE_CONTENT_FAILURE: 'UPDATE_CONTENT_FAILURE',

  DELETE_CONTENT_REQUEST: 'DELETE_CONTENT_REQUEST',
  DELETE_CONTENT_SUCCESS: 'DELETE_CONTENT_SUCCESS',
  DELETE_CONTENT_FAILURE: 'DELETE_CONTENT_FAILURE',
};

// Creators
export const contentActions = {
  getContent,
  getContents,
  createContent,
  updateContent,
  deleteContent,
};

// Implementations
function getContents({ q, type } = {}) {
  const query = qs.stringify({ q, type });
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/contents?${query}`,
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

  function request() { return { type: contentConstants.GET_CONTENTS_REQUEST } }
  function success(payload) { return { type: contentConstants.GET_CONTENTS_SUCCESS, payload } }
  function failure() { return { type: contentConstants.GET_CONTENTS_FAILURE } }
}

function getContent(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/contents/${id}`,
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

  function request() { return { type: contentConstants.GET_CONTENT_REQUEST } }
  function success(payload) { return { type: contentConstants.GET_CONTENT_SUCCESS, payload } }
  function failure() { return { type: contentConstants.GET_CONTENT_FAILURE } }
}

function createContent(fields) {
  if (!fields.title || !fields.state || !fields.type) {
    return dispatch => {
      dispatch(alertActions.error('Missing title, state, or type.'));
    };
  }

  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/contents',
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push(`/contents/${fields.type}s`));
        dispatch(alertActions.success(`New ${fields.type} created: "${fields.title}"`));
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

  function request() { return { type: contentConstants.CREATE_CONTENT_REQUEST } }
  function success() { return { type: contentConstants.CREATE_CONTENT_SUCCESS } }
  function failure() { return { type: contentConstants.CREATE_CONTENT_FAILURE } }
}

function updateContent(fields, id) {
  if (!fields.title || !fields.state || !fields.type) {
    return dispatch => {
      dispatch(alertActions.error('Missing title, state, or type.'));
    };
  }

  if (fields.bodySlate) {
    let value = Value.fromJSON(fields.bodySlate);
    const string = html.serialize(value);
    fields.bodyHtml = string;
  }

  return dispatch => {
    dispatch(request());

    axios({
      method: 'put',
      url: `/contents/${id}`,
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push(`/contents/${fields.type}s`));
        dispatch(alertActions.success(`Updated ${fields.type}: "${fields.title}"`));
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

  function request() { return { type: contentConstants.UPDATE_CONTENT_REQUEST } }
  function success() { return { type: contentConstants.UPDATE_CONTENT_SUCCESS } }
  function failure() { return { type: contentConstants.UPDATE_CONTENT_FAILURE } }
}

function deleteContent(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'delete',
      url: `/contents/${id}`,
      baseURL,
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(alertActions.success(`Deleted content with id: ${id}`));
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

  function request() { return { type: contentConstants.DELETE_CONTENT_REQUEST } }
  function success() { return { type: contentConstants.DELETE_CONTENT_SUCCESS } }
  function failure() { return { type: contentConstants.DELETE_CONTENT_FAILURE } }
}