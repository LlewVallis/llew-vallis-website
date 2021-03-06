import React, { useRef, useEffect } from "react";
import { SizeMe } from "react-sizeme";

import "./backdrop.scss";

const minimumPointDistance = 0.1;
const nearZ = 1;
const farZ = 6;
const lineDistance = 0.2;
const pointSize = 0.004;
const pointWanderDistance = 0.01;
const pointWanderFrequency = (Math.PI * 2) / 10;
const biasUpdateSpeed = 0.0075;

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
    this.mouseMovePublisher = new MouseMovePublisher();
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

        <div
          className="backdrop"
          ref={this.panelRef}
          onMouseMove={(e) => this.mouseMovePublisher.publish(e)}
          role="presentation"
        >
          <SizeMe monitorHeight noPlaceholder>
            {({ size }) => (
              <BackdropCanvas
                size={size}
                mouseMovePublisher={this.mouseMovePublisher}
              />
            )}
          </SizeMe>

          {this.props.children}
        </div>
      </>
    );
  }
}

class MouseMovePublisher {
  constructor() {
    this.observers = new Set();
  }

  subscribe(listener) {
    this.observers.add(listener);
  }

  unsubscribe(listener) {
    this.observers.delete(listener);
  }

  publish(event) {
    for (const observer of this.observers) {
      observer(event);
    }
  }
}

const BackdropCanvas = ({ size, mouseMovePublisher }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const drawState = createDrawState();

    let animationFrameId;

    const render = () => {
      drawBackdrop(ctx, drawState);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    const onMouseMove = (e) => {
      drawState.mouseX = e.clientX;
      drawState.mouseY = e.clientY;
    };

    mouseMovePublisher.subscribe(onMouseMove);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      mouseMovePublisher.unsubscribe(onMouseMove);
    };
  }, [mouseMovePublisher]);

  return (
    <canvas
      ref={canvasRef}
      className="backdrop-canvas"
      width={`${size.width}`}
      height={`${size.height}`}
    />
  );
};

const createDrawState = () => {
  const points = [];

  for (let i = 0; i < 1000; i++) {
    points.push(generatePoint());
  }

  const lines = [];
  const attachedPoints = new Set();

  for (let i = 0; i < points.length; i++) {
    const point = points[i];

    for (let j = 0; j < i; j++) {
      const neighbor = points[j];
      const distSquared = distanceSquared(point.position, neighbor.position);

      if (
        distSquared > minimumPointDistance ** 2 &&
        distSquared < lineDistance ** 2
      ) {
        lines.push({ start: point, end: neighbor });
        attachedPoints.add(i);
        attachedPoints.add(j);
      }
    }
  }

  const filteredPoints = [];
  for (const i of attachedPoints) {
    filteredPoints.push(points[i]);
  }

  return {
    points: filteredPoints,
    lines,
    mouseX: 0,
    mouseY: 0,
    smoothedMouseX: 0,
    smoothedMouseY: 0,
  };
};

const generatePoint = () => {
  const x = Math.random() * 2 - 0.5;
  const y = Math.random() * 2 - 0.5;
  const z = Math.random() * (farZ - nearZ) + nearZ;

  const wanderDistanceX = (Math.random() / 2 + 0.75) * pointWanderDistance;
  const wanderDistanceY = (Math.random() / 2 + 0.75) * pointWanderDistance;
  const wanderDistanceZ = (Math.random() / 2 + 0.75) * pointWanderDistance;
  const wanderFrequencyX = (Math.random() / 2 + 0.75) * pointWanderFrequency;
  const wanderFrequencyY = (Math.random() / 2 + 0.75) * pointWanderFrequency;
  const wanderFrequencyZ = (Math.random() / 2 + 0.75) * pointWanderFrequency;
  const oscillationOffsetX = Math.random() * Math.PI * 2;
  const oscillationOffsetY = Math.random() * Math.PI * 2;
  const oscillationOffsetZ = Math.random() * Math.PI * 2;

  return {
    position: { x, y, z },
    wanderDistance: {
      x: wanderDistanceX,
      y: wanderDistanceY,
      z: wanderDistanceZ,
    },
    wanderFrequency: {
      x: wanderFrequencyX,
      y: wanderFrequencyY,
      z: wanderFrequencyZ,
    },
    oscillationOffset: {
      x: oscillationOffsetX,
      y: oscillationOffsetY,
      z: oscillationOffsetZ,
    },
  };
};

const drawBackdrop = (ctx, drawState) => {
  const { width, height } = ctx.canvas;
  const { points, lines, mouseX, mouseY } = drawState;

  const size = Math.max(width, height);

  const now = performance.now() / 1000;

  drawState.smoothedMouseX =
    drawState.smoothedMouseX +
    biasUpdateSpeed * Math.sqrt(now) * (mouseX - drawState.smoothedMouseX);

  drawState.smoothedMouseY =
    drawState.smoothedMouseY +
    biasUpdateSpeed * Math.sqrt(now) * (mouseY - drawState.smoothedMouseY);

  const biasX = ((drawState.smoothedMouseX / width / size) * width - 0.5) * 2;
  const biasY =
    ((drawState.smoothedMouseY / height / size) * height - 0.5) * 2 - 0.5;

  ctx.clearRect(0, 0, size, size);

  updatePositions(now, width, height, biasX, biasY, size, points);
  drawPoints(ctx, size, points);
  drawLines(ctx, size, lines);
};

const updatePositions = (now, width, height, biasX, biasY, size, points) => {
  const calculateEffectivePosition = (point, axis) =>
    point.position[axis] +
    point.wanderDistance[axis] *
      Math.sin(
        point.wanderFrequency[axis] * now + point.oscillationOffset[axis]
      );

  for (const point of points) {
    const x = calculateEffectivePosition(point, "x");
    const y = calculateEffectivePosition(point, "y");
    const z = calculateEffectivePosition(point, "z");

    point.effectivePosition = { x, y, z };

    const biasFactor = ((farZ / 2 - z) / farZ) * 0.1;

    const displayX =
      (x - width / size / 2) / z + width / size / 2 + biasX * biasFactor;
    const displayY =
      (y - height / size / 2) / z + height / size / 2 + biasY * biasFactor;

    point.displayPosition = { x: displayX, y: displayY, z: 1 };
  }
};

const drawPoints = (ctx, size, points) => {
  for (const point of points) {
    const displaySize = pointSize / point.effectivePosition.z;

    const alpha = (farZ - point.effectivePosition.z) / farZ;
    ctx.fillStyle = graphicsColor(alpha);

    ctx.beginPath();
    ctx.arc(
      point.displayPosition.x * size,
      point.displayPosition.y * size,
      displaySize * size,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
};

const drawLines = (ctx, size, lines) => {
  for (const { start, end } of lines) {
    const averageZ = (start.effectivePosition.z + end.effectivePosition.z) / 2;
    const alpha = (farZ - averageZ) / farZ;
    ctx.strokeStyle = graphicsColor(alpha);

    ctx.beginPath();
    ctx.moveTo(start.displayPosition.x * size, start.displayPosition.y * size);
    ctx.lineTo(end.displayPosition.x * size, end.displayPosition.y * size);
    ctx.stroke();
  }
};

const distanceSquared = (a, b) =>
  (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;

const graphicsColor = (alpha) => `rgba(56, 214, 132, ${alpha})`;

export default Backdrop;
