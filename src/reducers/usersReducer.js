import { usersConstants } from '../actions';

const USERS_INITIAL = {
  users: null,
  user: null,
  isGettingUsers: false,
  isGettingUser: false,
  isUpdatingUser: false,
  isDeletingUser: false,
};

export const usersReducer = (state = USERS_INITIAL, action) => {
  switch (action.type) {
    case usersConstants.GET_USERS_REQUEST:
      return {
        ...state,
        isGettingUsers: true,
      };
    case usersConstants.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        isGettingUsers: false,
      };
    case usersConstants.GET_USERS_FAILURE:
      return {
        ...state,
        isGettingUsers: false,
      };

    case usersConstants.GET_USER_REQUEST:
      return {
        ...state,
        isGettingUser: true,
      };
    case usersConstants.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isGettingUser: false,
      };
    case usersConstants.GET_USER_FAILURE:
      return {
        ...state,
        isGettingUser: false,
      };
    
    case usersConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        isUpdatingUser: true,
      };
    case usersConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdatingUser: false,
      };
    case usersConstants.UPDATE_USER_FAILURE:
      return {
        ...state,
        isUpdatingUser: false,
      };
    
    case usersConstants.DELETE_USER_REQUEST:
      return {
        ...state,
        isDeletingUser: true,
      };
    case usersConstants.DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeletingUser: false,
      };
    case usersConstants.DELETE_USER_FAILURE:
      return {
        ...state,
        isDeletingUser: false,
      };

    default:
      return state;
  }
}
