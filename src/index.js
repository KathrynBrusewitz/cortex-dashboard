import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import Store, { history } from "./Store";
import Routes from "./Routes";
import "./index.css";

// Setup fake backend. Remove these two lines when adding real API
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

// Main Entry File
render(
  <Provider store={Store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.querySelector("#root")
);
