import React from "react";
import { Route, Link } from "react-router-dom";
import App from "./modules/app/App";
import Counter from "./modules/counter/Counter";

const Routes = () => (
  <div>
    <Route exact path="/" component={App} />
    <Route exact path="/counter" component={Counter} />
  </div>
);

export default Routes;
