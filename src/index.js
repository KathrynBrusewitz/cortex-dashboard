import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Store from "./Store";
import App from './components/app/App';
import "./index.css";

// Main Entry
render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
