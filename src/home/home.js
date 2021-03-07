import React from "react";
import TopPanel from "./top-panel/top-panel";

import "./home.scss";

import { react as About } from "../../text/about.md";
import Footer from "./footer";
import Work from "./work";
import ProjectsPanel from "./projects-panel";

const Home = () => (
  <>
    <TopPanel />

    <main className="content">
      <section className="about-container">
        <Heading>About me</Heading>
        <About />
      </section>

      <ProjectsPanel />

      <section className="work-container">
        <div>
          <Heading>Hire or contact me</Heading>
          <Work />
        </div>
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
