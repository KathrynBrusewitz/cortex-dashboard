import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  router: routerReducer,
  user,
  alert
});

export default rootReducer;