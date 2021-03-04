import React from "react";
import { Link } from "gatsby";

const NotFound = () => (
  <div className="center-of-page-container">
    <h1>Uh oh, 404</h1>
    <div>
      This route doesn't exist, <Link to="/">click here</Link> to go home
    </div>
  </div>
);

export default NotFound;
