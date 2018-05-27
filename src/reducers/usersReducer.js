import { usersConstants } from '../actions';

const USERS_INITIAL = {
  users: null,
  user: null,
  invites: null,

  isGettingUsers: false,
  isGettingUser: false,
  isUpdatingUser: false,
  isDeletingUser: false,

  isInvitingUser: false,
  isGettingInvites: false,
  isDeletingInvite: false,
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

    case usersConstants.INVITE_USER_REQUEST:
      return {
        ...state,
        isInvitingUser: true,
      };
    case usersConstants.INVITE_USER_SUCCESS:
      return {
        ...state,
        isInvitingUser: false,
      };
    case usersConstants.INVITE_USER_FAILURE:
      return {
        ...state,
        isInvitingUser: false,
      };
    
    case usersConstants.GET_INVITES_REQUEST:
      return {
        ...state,
        isGettingInvites: true,
      };
    case usersConstants.GET_INVITES_SUCCESS:
      return {
        ...state,
        invites: action.invites,
        isGettingInvites: false,
      };
    case usersConstants.GET_INVITES_FAILURE:
      return {
        ...state,
        isGettingInvites: false,
      };

    case usersConstants.DELETE_INVITE_REQUEST:
      return {
        ...state,
        isDeletingInvite: true,
      };
    case usersConstants.DELETE_INVITE_SUCCESS:
      return {
        ...state,
        isDeletingInvite: false,
      };
    case usersConstants.DELETE_INVITE_FAILURE:
      return {
        ...state,
        isDeletingInvite: false,
      };

    default:
      return state;
  }
}
