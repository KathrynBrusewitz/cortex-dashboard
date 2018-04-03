import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from './reducers';

// Create a history of your choosing (we're using browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [thunk, routerMiddleware(history)];

// Build the middleware for communicating with devtools extension
const enhancers = [];
if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

// Apply our middleware for navigating
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

// Passing initial state is useful for server-side rendering and great for SEO
const Store = createStore(rootReducer, composedEnhancers);

export default Store;
