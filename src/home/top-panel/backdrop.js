import React from "react";

import Vanta from "vanta/src/vanta.net";
import * as Three from "three";

import "./backdrop.scss";

const backdropClipPath = `
  M 0 0
  L 0 1
  L 1 0.8
  L 1 0
  Z
`;

class Backdrop extends React.Component {
  constructor(props) {
    super(props);
    this.panelRef = React.createRef();
  }

  componentDidMount() {
    this.vantaEffect = Vanta({
      el: this.panelRef.current,
      THREE: Three,
      touchControls: true,
      gyroControls: true,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x20ffaa,
      backgroundColor: 0x181818,
      points: 13,
      maxDistance: 30,
      spacing: 25,
    });
  }

  componentWillUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }

  render() {
    return (
      <>
        <svg className="clip-path-svg">
          <clipPath id="backdrop-clip" clipPathUnits="objectBoundingBox">
            <path d={backdropClipPath} />
          </clipPath>
        </svg>

        <div className="backdrop-shadow" />

        <div className="backdrop" ref={this.panelRef}>
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Backdrop;
