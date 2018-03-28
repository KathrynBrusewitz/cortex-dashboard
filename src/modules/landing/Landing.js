import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <div>
    <h1>Landing Page</h1>
    <p>Add info about Cortex. Add login form.</p>

    <Link to="/counter">
      <button>
        Go to counter page for an example of using Redux.
      </button>
    </Link> 
   
  </div>
);

export default Landing;
