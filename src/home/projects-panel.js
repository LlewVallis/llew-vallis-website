import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import { react as UrmwStats } from "../../text/urmw-stats.md"
import { react as OpenMissileWars } from "../../text/open-missile-wars.md"

import "./projects-panel.scss"

const headerClipPath = `
  M 0 0.9
  L 0 1
  L 1 1
  L 1 0
  Z
`;

const footerClipPath = `
  M 0 0
  L 0 1
  L 1 0.1
  L 1 0
  Z
`;

const ProjectsPanel = () => (
  <div className="projects-panel-container">
    <PanelHeader />

    <div className="projects-panel">
      <Project content={UrmwStats}>
        <StaticImage
          className="project-image"
          src="../../images/urmw-stats.png"
          alt="URMW Stats screenshot"
          loading="eager"
          placeholder="blurred"
        />
      </Project>

      <Project content={OpenMissileWars}>
        <StaticImage
          className="project-image"
          src="../../images/open-missile-wars.png"
          alt="OpenMissileWars cover"
          loading="eager"
          placeholder="blurred"
        />
      </Project>
    </div>

    <PanelFooter />
  </div>
);

const Project = ({ content: Content, children }) => (
  <div className="project">
    {children}

    <div className="project-content">
      <Content />
    </div>
  </div>
);

const PanelHeader = () => (
  <div className="projects-panel-header-container">
    <svg className="clip-path-svg">
      <clipPath id="projects-panel-header-clip" clipPathUnits="objectBoundingBox">
        <path d={headerClipPath} />
      </clipPath>
    </svg>

    <div className="projects-panel-heading">
      <h2>My Projects</h2>
    </div>

    <div className="projects-panel-header" />
    <div className="projects-panel-header-shadow" />
  </div>
);

const PanelFooter = () => (
  <div className="projects-panel-footer-container">
    <svg className="clip-path-svg">
      <clipPath id="projects-panel-footer-clip" clipPathUnits="objectBoundingBox">
        <path d={footerClipPath} />
      </clipPath>
    </svg>

    <div className="projects-panel-footer" />
    <div className="projects-panel-footer-shadow" />
  </div>
);

export default ProjectsPanel;