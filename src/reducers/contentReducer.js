import { contentConstants } from '../actions';

const CONTENT_INITIAL = {
  content: null,
  contents: null,
  isGettingContent: false,
  isGettingContents: false,
  isCreatingContent: false,
  isUpdatingContent: false,
  isDeletingContent: false,
};

export const contentReducer = (state = CONTENT_INITIAL, action) => {
  switch (action.type) {
    case contentConstants.GET_CONTENT_REQUEST:
      return {
        ...state,
        isGettingContent: true,
      };
    case contentConstants.GET_CONTENT_SUCCESS:
      return {
        ...state,
        content: action.payload,
        isGettingContent: false,
      };
    case contentConstants.GET_CONTENT_FAILURE:
      return {
        ...state,
        content: null,
        isGettingContent: false,
      };

    case contentConstants.GET_CONTENTS_REQUEST:
      return {
        ...state,
        isGettingContents: true,
      };
    case contentConstants.GET_CONTENTS_SUCCESS:
      return {
        ...state,
        contents: action.payload,
        isGettingContents: false,
      };
    case contentConstants.GET_CONTENTS_FAILURE:
      return {
        ...state,
        contents: null,
        isGettingContents: false,
      };

    case contentConstants.CREATE_CONTENT_REQUEST:
      return {
        ...state,
        isCreatingContent: true,
      };
    case contentConstants.CREATE_CONTENT_SUCCESS:
      return {
        ...state,
        isCreatingContent: false,
      };
    case contentConstants.CREATE_CONTENT_FAILURE:
      return {
        ...state,
        isCreatingContent: false,
      };
    
    case contentConstants.UPDATE_CONTENT_REQUEST:
      return {
        ...state,
        isUpdatingContent: true,
      };
    case contentConstants.UPDATE_CONTENT_SUCCESS:
      return {
        ...state,
        isUpdatingContent: false,
      };
    case contentConstants.UPDATE_CONTENT_FAILURE:
      return {
        ...state,
        isUpdatingContent: false,
      };
    
    case contentConstants.DELETE_CONTENT_REQUEST:
      return {
        ...state,
        isDeletingContent: true,
      };
    case contentConstants.DELETE_CONTENT_SUCCESS:
      return {
        ...state,
        isDeletingContent: false,
      };
    case contentConstants.DELETE_CONTENT_FAILURE:
      return {
        ...state,
        isDeletingContent: false,
      };
      
    default:
      return state;
  }
}
