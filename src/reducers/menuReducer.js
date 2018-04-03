import { menuConstants } from '../actions';

const MENU_INITIAL = {
  open: true,
};

export const menuReducer = (state = MENU_INITIAL, action) => {
  switch (action.type) {
    case menuConstants.OPEN:
      return {
        open: action.openMenu
      };
    default:
      return state;
  }
}
