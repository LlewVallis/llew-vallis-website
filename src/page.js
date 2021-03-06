import React from "react";
import { Helmet } from "react-helmet";

import "./common.scss";

const description =
  "Hey, I'm Llew - a software developer whose been at it since 2014.";

const Page = ({ children }) => (
  <>
    <Helmet>
      <title>Llew Vallis</title>
      <meta property="og:title" content="Llew Vallis" />
      <meta name="twitter:title" content="Llew Vallis" />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />

      <meta property="og:type" content="website" />
    </Helmet>

    {children}
  </>
);

export default Page;
