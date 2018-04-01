import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Store from "./Store";
import App from './components/app/App';
import "./index.css";

// Setup fake backend. Remove these two lines when adding real API
import { fakeBackend } from './utilities';
fakeBackend();

// Main Entry
render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
