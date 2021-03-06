import React from "react";
import TopPanel from "./top-panel/top-panel";

import "./home.scss";

import { react as About } from "./about.md";
import Footer from "./footer";
import Work from "./work";

const Home = () => (
  <>
    <TopPanel />

    <main className="content">
      <section>
        <Heading>About me</Heading>
        <About />
      </section>
      <section>
        <Heading>Hire or contact me</Heading>
        <Work />
      </section>
    </main>

    <Footer />
  </>
);

const Heading = ({ children }) => (
  <div className="heading-wrapper">
    <h2 className="heading">{children}</h2>
  </div>
);

export default Home;
