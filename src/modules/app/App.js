import React from "react";
import { Route, Link } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Landing from "../landing/Landing";

// if logged out, show Landing
// if logged in, show Dashboard
const currentUser = false;

const App = () => (
  <div>
    {!currentUser && <Route path="/" component={Landing} /> }
    {currentUser && <Route path="/" component={Dashboard} />}
  </div>
);

export default App;
