import React from "react";

import VantaFog from "vanta/src/vanta.fog";
import * as Three from "three";

class Fog extends React.Component {
  constructor(props) {
    super(props);
    this.panelRef = React.createRef();
  }

  componentDidMount() {
    this.vantaEffect = VantaFog({
      el: this.panelRef.current,
      THREE: Three,
    });
  }

  componentWillUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
        ref={this.panelRef}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Fog;
