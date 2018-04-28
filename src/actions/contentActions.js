import { push } from 'react-router-redux';
import { alertActions } from './';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseURL = 'http://localhost:8080/api/';
const cookies = new Cookies();
const token = cookies.get('token');

// Types
export const contentConstants = {
  GET_CONTENT_REQUEST: 'GET_CONTENT_REQUEST',
  GET_CONTENT_SUCCESS: 'GET_CONTENT_SUCCESS',
  GET_CONTENT_FAILURE: 'GET_CONTENT_FAILURE',

  CREATE_ARTICLE_REQUEST: 'CREATE_ARTICLE_REQUEST',
  CREATE_ARTICLE_SUCCESS: 'CREATE_ARTICLE_SUCCESS',
  CREATE_ARTICLE_FAILURE: 'CREATE_ARTICLE_FAILURE',
};

// Creators
export const contentActions = {
  getContent,
  createArticle,
};

// Implementations
function getContent() {
  return dispatch => {
    dispatch(request());

    axios({
      method: 'get',
      url: '/content',
      baseURL,
      headers: {'x-access-token': token},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success(res.data.content));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure(error));
      dispatch(alertActions.error('Unable to Get Content'));
    });
  };

  function request() { return { type: contentConstants.GET_CONTENT_REQUEST } }
  function success(content) { return { type: contentConstants.GET_CONTENT_SUCCESS, content } }
  function failure() { return { type: contentConstants.GET_CONTENT_FAILURE } }
}

function createArticle(fields) {
  console.log(fields);
  return dispatch => {
    dispatch(request());

    axios({
      method: 'post',
      url: '/content',
      baseURL,
      data: {
        ...fields,
        type: "article",
      },
      headers: {'x-access-token': token},
    })
    .then(res => {
      if (res.data.success) {
        dispatch(success());
        dispatch(push('/articles'));
        dispatch(alertActions.success('Article Successfully Created'));
      } else {
        dispatch(failure());
        dispatch(alertActions.error(res.data.message));
      }
    })
    .catch(error => {
      dispatch(failure(error));
      dispatch(alertActions.error('Unable to Create Article'));
    });
  };

  function request() { return { type: contentConstants.CREATE_ARTICLE_REQUEST } }
  function success() { return { type: contentConstants.CREATE_ARTICLE_SUCCESS } }
  function failure() { return { type: contentConstants.CREATE_ARTICLE_FAILURE } }
}