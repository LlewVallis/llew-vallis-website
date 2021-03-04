import * as React from "react";
import Page from "../components/page";
import { Link } from "gatsby";

import "./404.scss";

const NotFoundPage = () => (
  <Page>
    <div className="center-of-page-container">
      <h1>Uh oh, 404</h1>
      <div>
        This route doesn't exist, <Link to="/">click here</Link> to go home
      </div>
    </div>
  </Page>
)

export default NotFoundPage;
