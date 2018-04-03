import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { alertReducer } from './alertReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  alert: alertReducer,
});

export default rootReducer;