import React from "react";

import "./footer.scss";

const footerClipPath = `
  M 0 0.6
  L 0 1
  L 1 1
  L 1 0
  Z
`;

const Footer = () => (
  <div className="footer-container">
    <svg className="clip-path-svg">
      <clipPath id="footer-clip" clipPathUnits="objectBoundingBox">
        <path d={footerClipPath} />
      </clipPath>
    </svg>

    <footer className="footer">
      <div className="footer-details">
        <a href="https://github.com/LlewVallis/llew-vallis-website">
          Source hosted on GitHub
        </a>
        <br />
        Copyright Llewellyn Vallis, 2021
      </div>
    </footer>

    <div className="footer-shadow" />
  </div>
);

export default Footer;
