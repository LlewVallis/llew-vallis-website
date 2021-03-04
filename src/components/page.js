import * as React from "react";
import { Helmet } from "react-helmet";

import "./common.scss";

const Page = ({ children }) => (
  <>
    <Helmet>
      <title>Llew Vallis</title>
    </Helmet>

    {children}
  </>
);

export default Page;
