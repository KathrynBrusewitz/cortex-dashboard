import { push } from 'react-router-redux';
import { alertActions } from './';
import axios from 'axios';
import queryString from 'query-string';
import { baseURL, cookies } from '../constants';

// Types
export const eventsConstants = {
  GET_EVENTS_REQUEST: 'GET_EVENTS_REQUEST',
  GET_EVENTS_SUCCESS: 'GET_EVENTS_SUCCESS',
  GET_EVENTS_FAILURE: 'GET_EVENTS_FAILURE',

  GET_EVENT_REQUEST: 'GET_EVENT_REQUEST',
  GET_EVENT_SUCCESS: 'GET_EVENT_SUCCESS',
  GET_EVENT_FAILURE: 'GET_EVENT_FAILURE',

  CREATE_EVENT_REQUEST: 'CREATE_EVENT_REQUEST',
  CREATE_EVENT_SUCCESS: 'CREATE_EVENT_SUCCESS',
  CREATE_EVENT_FAILURE: 'CREATE_EVENT_FAILURE',

  UPDATE_EVENT_REQUEST: 'UPDATE_EVENT_REQUEST',
  UPDATE_EVENT_SUCCESS: 'UPDATE_EVENT_SUCCESS',
  UPDATE_EVENT_FAILURE: 'UPDATE_EVENT_FAILURE',

  DELETE_EVENT_REQUEST: 'DELETE_EVENT_REQUEST',
  DELETE_EVENT_SUCCESS: 'DELETE_EVENT_SUCCESS',
  DELETE_EVENT_FAILURE: 'DELETE_EVENT_FAILURE',
};

// Creators
export const eventsActions = {
  getEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

// Implementations
function getEvents(filters = {}) {
  const query = queryString.stringify(filters);
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/events?${query}`,
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

  function request() { return { type: eventsConstants.GET_EVENTS_REQUEST } }
  function success(payload) { return { type: eventsConstants.GET_EVENTS_SUCCESS, payload } }
  function failure() { return { type: eventsConstants.GET_EVENTS_FAILURE } }
}

function getEvent(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/events/${id}`,
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

  function request() { return { type: eventsConstants.GET_EVENT_REQUEST } }
  function success(payload) { return { type: eventsConstants.GET_EVENT_SUCCESS, payload } }
  function failure() { return { type: eventsConstants.GET_EVENT_FAILURE } }
}

function createEvent(fields) {
  if (!fields.title || !fields.description) {
    return dispatch => {
      dispatch(alertActions.error('Event is missing title or description'));
    };
  }

  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/events',
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/events'));
        dispatch(alertActions.success(`New event created: "${fields.title}"`));
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

  function request() { return { type: eventsConstants.CREATE_EVENT_REQUEST } }
  function success() { return { type: eventsConstants.CREATE_EVENT_SUCCESS } }
  function failure() { return { type: eventsConstants.CREATE_EVENT_FAILURE } }
}

function updateEvent(fields, id) {
  if (!fields.title || !fields.description) {
    return dispatch => {
      dispatch(alertActions.error('Event is missing title or description'));
    };
  }

  return dispatch => {
    dispatch(request());

    axios({
      method: 'put',
      url: `/events/${id}`,
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/events'));
        dispatch(alertActions.success(`Updated event: "${fields.title}"`));
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

  function request() { return { type: eventsConstants.UPDATE_EVENT_REQUEST } }
  function success() { return { type: eventsConstants.UPDATE_EVENT_SUCCESS } }
  function failure() { return { type: eventsConstants.UPDATE_EVENT_FAILURE } }
}

function deleteEvent(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'delete',
      url: `/events/${id}`,
      baseURL,
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(alertActions.success(`Deleted event with id: ${id}`));
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

  function request() { return { type: eventsConstants.DELETE_EVENT_REQUEST } }
  function success() { return { type: eventsConstants.DELETE_EVENT_SUCCESS } }
  function failure() { return { type: eventsConstants.DELETE_EVENT_FAILURE } }
}