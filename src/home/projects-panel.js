import { StaticImage } from "gatsby-plugin-image";
import React from "react";

import { react as UrmwStats } from "../../text/urmw-stats.md";
import { react as DungeonDemons } from "../../text/dungeon-demons.md";
import { react as OpenMissileWars } from "../../text/open-missile-wars.md";
import { react as TourneyBase } from "../../text/tourney-base.md";
import { react as Skillbot } from "../../text/skillbot.md";
import { react as LudumDare } from "../../text/ludum-dare.md";

import { GlobeIcon, CodeIcon, CrossReferenceIcon } from "@primer/octicons-react";

import "./projects-panel.scss";

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
      <Project
        image={
          <StaticImage
            className="project-image"
            src="../../images/urmw-stats.png"
            alt="URMW Stats cover"
            loading="eager"
            placeholder="blurred"
          />
        }
        content={UrmwStats}
        links={[
          {
            icon: CodeIcon,
            name: "GitHub Repository",
            href: "https://github.com/LlewVallis/UrmwStats",
          },
          { icon: GlobeIcon, name: "Website", href: "https://urmw.markng.me" },
        ]}
      />

      <Project
        image={
          <StaticImage
            className="project-image"
            src="../../images/dungeon-demons.png"
            alt="Dungeon Demons cover"
            loading="eager"
            placeholder="blurred"
          />
        }
        content={DungeonDemons}
        links={[
          { 
            icon: GlobeIcon,
            name: "Website",
            href: "https://dungeon-demons.netlify.app",
          },
        ]}
      />

      <Project
        image={
          <StaticImage
            className="project-image"
            src="../../images/open-missile-wars.png"
            alt="OpenMissileWars cover"
            loading="eager"
            placeholder="blurred"
          />
        }
        content={OpenMissileWars}
        links={[
          {
            icon: CodeIcon,
            name: "GitHub Repository",
            href: "https://github.com/LlewVallis/OpenMissileWars",
          },
        ]}
      />

      <Project
        image={
          <StaticImage
            className="project-image"
            src="../../images/tourney-base.png"
            alt="Tourney Base cover"
            loading="eager"
            placeholder="blurred"
          />
        }
        content={TourneyBase}
        links={[
          { 
            icon: GlobeIcon,
            name: "Website",
            href: "https://tourney-base.vercel.app",
          },
        ]}
      />

      <Project
        image={
          <StaticImage
            className="project-image"
            src="../../images/ludum-dare.png"
            alt="Ludum Dare cover"
            loading="eager"
            placeholder="blurred"
          />
        }
        content={LudumDare}
        links={[
          {
            icon: CrossReferenceIcon,
            name: "Games list",
            href: "https://ldjam.com/users/surprisinglyshockedcat/games",
          },
        ]}
      />

      <Project
        image={
          <StaticImage
            className="project-image"
            src="../../images/skillbot.png"
            alt="Skillbot cover"
            loading="eager"
            placeholder="blurred"
          />
        }
        content={Skillbot}
        links={[
          {
            icon: CodeIcon,
            name: "GitHub Repository",
            href: "https://github.com/LlewVallis/Skillbot",
          },
        ]}
      />
    </div>

    <PanelFooter />
  </div>
);

const Project = ({ image, content: Content, links }) => (
  <div className="project">
    {image}

    <div className="project-content">
      <Content />
    </div>

    <ul>
      {links.map((link) => (
        <li>
          <link.icon className="link-icon" />
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const PanelHeader = () => (
  <div className="projects-panel-header-container">
    <svg className="clip-path-svg">
      <clipPath
        id="projects-panel-header-clip"
        clipPathUnits="objectBoundingBox"
      >
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
      <clipPath
        id="projects-panel-footer-clip"
        clipPathUnits="objectBoundingBox"
      >
        <path d={footerClipPath} />
      </clipPath>
    </svg>

    <div className="projects-panel-footer" />
    <div className="projects-panel-footer-shadow" />
  </div>
);

export default ProjectsPanel;
