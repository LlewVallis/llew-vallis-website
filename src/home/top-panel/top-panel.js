import React from "react";
import Backdrop from "./backdrop";

import { MailIcon, MarkGithubIcon } from "@primer/octicons-react";

import Portrait from "../../../images/portrait.svg";

import "./top-panel.scss";

const TopPanel = () => (
  <Backdrop>
    <div className="backdrop-content">
      <div className="greeting">
        <Heading />
        <SocialLinks />
      </div>

      <div className="backdrop-content-breaker" />

      <img className="portrait" src={Portrait} alt="" />
    </div>
  </Backdrop>
);

const Heading = () => (
  <h1>
    Hey, <br />
    I'm Llew.
  </h1>
);

const SocialLinks = () => (
  <div className="social-links">
    <SocialLinkLine>
      <MailIcon />
      <SocialLink href="mailto://llewvallis@gmail.com">
        llewvallis@gmail.com
      </SocialLink>
    </SocialLinkLine>
    <SocialLinkLine>
      <MarkGithubIcon />
      <SocialLink href="https://github.com/LlewVallis">
        github.com/LlewVallis
      </SocialLink>
    </SocialLinkLine>
  </div>
);

const SocialLinkLine = ({ children }) => (
  <div className="social-link-line">{children}</div>
);

const SocialLink = ({ href, children }) => (
  <a className="social-link" target="_blank" rel="noreferrer" href={href}>
    {children}
  </a>
);

export default TopPanel;
