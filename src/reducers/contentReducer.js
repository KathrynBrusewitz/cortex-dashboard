import { contentConstants } from '../actions';

const CONTENT_INITIAL = {
  content: null,
  isGettingContent: false,
  isCreatingArticle: false,
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
        content: action.content,
        isGettingContent: false,
      };
    case contentConstants.GET_CONTENT_FAILURE:
      return {
        ...state,
        content: null,
        isGettingContent: false,
      };
    case contentConstants.CREATE_ARTICLE_REQUEST:
      return {
        ...state,
        isCreatingArticle: true,
      };
    case contentConstants.CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        isCreatingArticle: false,
      };
    case contentConstants.CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        isCreatingArticle: false,
      };
    default:
      return state;
  }
}
