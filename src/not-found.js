import React from "react";
import { Link } from "gatsby";

import "./not-found.scss";

const NotFound = () => (
  <div style={{ height: "60vh" }} className="center-of-page-container">
    <h1>Uh oh, 404</h1>
    <b>
      This page doesn't exist, <Link to="/">click here</Link> to go home
    </b>
  </div>
);

export default NotFound;
