import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { alertReducer } from './alertReducer';
import { authReducer } from './authReducer';
import { menuReducer } from './menuReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  alert: alertReducer,
  auth: authReducer,
  menu: menuReducer,
});

export default rootReducer;
