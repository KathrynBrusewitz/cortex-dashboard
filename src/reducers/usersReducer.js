import { usersConstants } from '../actions';

const USERS_INITIAL = {
  users: null,
  user: null,
  isGettingUsers: false,
  isGettingUser: false,
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
    default:
      return state;
  }
}
