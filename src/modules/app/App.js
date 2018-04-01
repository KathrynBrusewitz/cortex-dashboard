import React from "react";
import { Route, Link } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import Landing from "../landing/Landing";

// Directs routes based on current user (logged in/out)
// Logged Out ? show Landing : show Dashboard

// Fake backend var for testing
const currentUser = false;

const App = () => (
  <div>
    {!currentUser && <Route path="/" component={Landing} /> }
    {currentUser && <Route path="/" component={Dashboard} />}
  </div>
);

export default App;
