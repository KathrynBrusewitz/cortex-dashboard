// Types
export const menuConstants = {
  OPEN: 'MENU_OPEN',
};

// Creators
export const menuActions = {
  open,
};

// Implementations
function open(openMenu) {
  return { type: menuConstants.OPEN, openMenu };
}
