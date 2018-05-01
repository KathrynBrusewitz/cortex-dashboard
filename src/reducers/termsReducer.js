import { termsConstants } from '../actions';

const TERMS_INITIAL = {
  term: null,
  terms: null,
  isGettingTerm: false,
  isGettingTerms: false,
  isCreatingTerm: false,
  isUpdatingTerm: false,
  isDeletingTerm: false,
};

export const termsReducer = (state = TERMS_INITIAL, action) => {
  switch (action.type) {
    case termsConstants.GET_TERM_REQUEST:
      return {
        ...state,
        isGettingTerm: true,
      };
    case termsConstants.GET_TERM_SUCCESS:
      return {
        ...state,
        term: action.payload,
        isGettingTerm: false,
      };
    case termsConstants.GET_TERM_FAILURE:
      return {
        ...state,
        term: null,
        isGettingTerm: false,
      };

    case termsConstants.GET_TERMS_REQUEST:
      return {
        ...state,
        isGettingTerms: true,
      };
    case termsConstants.GET_TERMS_SUCCESS:
      return {
        ...state,
        terms: action.payload,
        isGettingTerms: false,
      };
    case termsConstants.GET_TERMS_FAILURE:
      return {
        ...state,
        terms: null,
        isGettingTerms: false,
      };

    case termsConstants.CREATE_TERM_REQUEST:
      return {
        ...state,
        isCreatingTerm: true,
      };
    case termsConstants.CREATE_TERM_SUCCESS:
      return {
        ...state,
        isCreatingTerm: false,
      };
    case termsConstants.CREATE_TERM_FAILURE:
      return {
        ...state,
        isCreatingTerm: false,
      };
    
    case termsConstants.UPDATE_TERM_REQUEST:
      return {
        ...state,
        isUpdatingTerm: true,
      };
    case termsConstants.UPDATE_TERM_SUCCESS:
      return {
        ...state,
        isUpdatingTerm: false,
      };
    case termsConstants.UPDATE_TERM_FAILURE:
      return {
        ...state,
        isUpdatingTerm: false,
      };
    
    case termsConstants.DELETE_TERM_REQUEST:
      return {
        ...state,
        isDeletingTerm: true,
      };
    case termsConstants.DELETE_TERM_SUCCESS:
      return {
        ...state,
        isDeletingTerm: false,
      };
    case termsConstants.DELETE_TERM_FAILURE:
      return {
        ...state,
        isDeletingTerm: false,
      };
      
    default:
      return state;
  }
}
