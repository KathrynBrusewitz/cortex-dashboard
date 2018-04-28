import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { alertReducer } from './alertReducer';
import { authReducer } from './authReducer';
import { menuReducer } from './menuReducer';
import { usersReducer } from './usersReducer';
import { contentReducer } from './contentReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  alert: alertReducer,
  auth: authReducer,
  menu: menuReducer,
  users: usersReducer,
  content: contentReducer,
});

export default rootReducer;
