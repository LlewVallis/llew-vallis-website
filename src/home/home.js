import React from "react";
import TopPanel from "./top-panel/top-panel";

import "./home.scss";

import { react as About } from "./about.md";

const Home = () => (
  <>
    <TopPanel />

    <main class="content">
      <Heading>About me</Heading>
      <About />

      <Heading>Lets work together</Heading>
      <WorkCaption />
    </main>
  </>
);

const Heading = ({ children }) => (
  <div className="heading-wrapper">
    <h2 className="heading">{children}</h2>
  </div>
);

const WorkCaption = () => (
  <p>
    Got something in mind? Shoot me an email at{" "}
    <a href="mailto://llewvallis@gmail.com">llewvallis@gmail.com</a> or catch me
    on Discord at <b>Llew Vallis#5734</b> if thats more your style.
  </p>
);

export default Home;
