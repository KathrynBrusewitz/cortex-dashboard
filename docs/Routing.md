# Routing

## Dependencies
- `react-router`: Core library. [Documentation](https://reacttraining.com/react-router/core/guides/philosophy)
- `react-router-dom`: Support for DOM environment. [Documentation](https://reacttraining.com/react-router/web/guides/basic-components) | [Repo](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
- `react-router-redux`: Keep state in sync with router. [Documentation](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) | [Redux Integration](https://reacttraining.com/react-router/core/guides/redux-integration)
- `history`: Helps manage history stack, navigate, confirm navigation, and persist state between sessions. [Documentation](https://github.com/ReactTraining/history)

## Configuration

All routing components depend on `BrowserHistory` to provide the browser's HTML5 History API. The `BrowserHistory` object is added as middleware to the Redux Store. 

### `/src/Store.js`

```js
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from './reducers';

// Create BrowserHistory for modern browsers that support the HTML5 history API
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
```

Which is then applied to the Provider wrapping the app in the main entry file so that it supplies the needed APIs throughout the entire app.

### `/src/Store.js`

```
// Main Entry
render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
```
