import { authConstants } from '../actions';

const AUTH_INITIAL = {
  // TODO: Remove once API is hooked up
  // ONLY for testing to stay logged in after refresh
  // user: {
  //   email: 'kathryn.brusewitz@gmail.com',
  //   name: 'Kathryn Brusewitz',
  // },
};

export const authReducer = (state = AUTH_INITIAL, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        user: action.user,
      };
    case authConstants.LOGIN_FAILURE:
      return {};
    case authConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
