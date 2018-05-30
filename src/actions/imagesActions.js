import { push } from 'react-router-redux';
import { alertActions } from './';
import axios from 'axios';
import queryString from 'query-string';
import { baseURL, cookies } from '../constants';

// Types
export const imagesConstants = {
  GET_IMAGES_REQUEST: 'GET_IMAGES_REQUEST',
  GET_IMAGES_SUCCESS: 'GET_IMAGES_SUCCESS',
  GET_IMAGES_FAILURE: 'GET_IMAGES_FAILURE',

  GET_IMAGE_REQUEST: 'GET_IMAGE_REQUEST',
  GET_IMAGE_SUCCESS: 'GET_IMAGE_SUCCESS',
  GET_IMAGE_FAILURE: 'GET_IMAGE_FAILURE',

  CREATE_IMAGE_REQUEST: 'CREATE_IMAGE_REQUEST',
  CREATE_IMAGE_SUCCESS: 'CREATE_IMAGE_SUCCESS',
  CREATE_IMAGE_FAILURE: 'CREATE_IMAGE_FAILURE',

  UPDATE_IMAGE_REQUEST: 'UPDATE_IMAGE_REQUEST',
  UPDATE_IMAGE_SUCCESS: 'UPDATE_IMAGE_SUCCESS',
  UPDATE_IMAGE_FAILURE: 'UPDATE_IMAGE_FAILURE',

  DELETE_IMAGE_REQUEST: 'DELETE_IMAGE_REQUEST',
  DELETE_IMAGE_SUCCESS: 'DELETE_IMAGE_SUCCESS',
  DELETE_IMAGE_FAILURE: 'DELETE_IMAGE_FAILURE',
};

// Creators
export const imagesActions = {
  getImage,
  getImages,
  createImage,
  updateImage,
  deleteImage,
};

// Implementations
function getImages(filters = {}) {
  const query = queryString.stringify(filters);
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/images?${query}`,
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

  function request() { return { type: imagesConstants.GET_IMAGES_REQUEST } }
  function success(payload) { return { type: imagesConstants.GET_IMAGES_SUCCESS, payload } }
  function failure() { return { type: imagesConstants.GET_IMAGES_FAILURE } }
}

function getImage(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: `/images/${id}`,
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

  function request() { return { type: imagesConstants.GET_IMAGE_REQUEST } }
  function success(payload) { return { type: imagesConstants.GET_IMAGE_SUCCESS, payload } }
  function failure() { return { type: imagesConstants.GET_IMAGE_FAILURE } }
}

function createImage(fields) {
  let formData = new FormData();
  formData.append("image", fields.upload[0]);
  Object.keys(fields).forEach(function(key) {
    let value = fields[key];
    if (key === "upload") {
      return;
    }
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/images',
      baseURL,
      data: formData,
      headers: {
        'x-access-token': cookies.get('token'),
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/contents/artwork'));
        dispatch(alertActions.success(`New image created: "${res.data.payload.title}"`));
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

  function request() { return { type: imagesConstants.CREATE_IMAGE_REQUEST } }
  function success() { return { type: imagesConstants.CREATE_IMAGE_SUCCESS } }
  function failure() { return { type: imagesConstants.CREATE_IMAGE_FAILURE } }
}

function updateImage(fields, id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'put',
      url: `/images/${id}`,
      baseURL,
      data: {
        ...fields,
      },
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/images'));
        dispatch(alertActions.success(`Updated image: "${fields.title}"`));
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

  function request() { return { type: imagesConstants.UPDATE_IMAGE_REQUEST } }
  function success() { return { type: imagesConstants.UPDATE_IMAGE_SUCCESS } }
  function failure() { return { type: imagesConstants.UPDATE_IMAGE_FAILURE } }
}

function deleteImage(id) {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'delete',
      url: `/images/${id}`,
      baseURL,
      headers: {'x-access-token': cookies.get('token')},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(alertActions.success(`Deleted image with id: ${id}`));
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

  function request() { return { type: imagesConstants.DELETE_IMAGE_REQUEST } }
  function success() { return { type: imagesConstants.DELETE_IMAGE_SUCCESS } }
  function failure() { return { type: imagesConstants.DELETE_IMAGE_FAILURE } }
}