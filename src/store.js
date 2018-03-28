import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { routerMiddleware, routerReducer } from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

// Import all the reducers here
import counter from "./reducers/counter";

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Combine all the reducers here
const rootReducer = combineReducers({
  routing: routerReducer,
  counter
});

const initialState = {};
const enhancers = [];
// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

// Apply our middleware for navigating
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// Add the reducer to your store on the `router` key
const Store = createStore(rootReducer, initialState, composedEnhancers);

export default Store;
