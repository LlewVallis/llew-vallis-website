"use client";

import { useEffect, useRef } from "react";
import Delaunator from "delaunator";
import PoissonDiskSampling from "poisson-disk-sampling";

const GRID_SLACK = 0.1;
const MIN_POINT_DISTANCE = 0.05;
const LINE_SCALE = 0.00125;

const SCALING_THRESHOLD = 1000;

const MIN_LINE_CHANCE = 0;
const MAX_LINE_CHANCE = 1;
const MIN_WANDER_AMP = 0.001;
const MAX_WANDER_AMP = 0.01;
const MIN_WANDER_FREQ = 0.25;
const MAX_WANDER_FREQ = 0.75;
const MIN_WANDER_OFFSET = 0;
const MAX_WANDER_OFFSET = Math.PI * 2;

const MOUSE_PUSH_SIZE = 0.05;
const MOUSE_PUSH_STRENGTH = 0.0075;

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!!;
    const animation = new CanvasAnimation(canvas);
    return () => animation.stop();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full opacity-0 transition-opacity duration-[2.5s]"
      style={{
        mask: "linear-gradient(to right, transparent, black)",
      }}
    />
  );
}

function lerp(x: number, low: number, high: number): number {
  return x * (high - low) + low;
}

function random(low: number, high: number): number {
  return lerp(Math.random(), low, high);
}

class CanvasAnimation {
  private frameCallback: number;
  private readonly ctx: CanvasRenderingContext2D;

  private readonly points: Point[] = [];
  private readonly edges: Edge[] = [];

  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!!;
    this.frameCallback = requestAnimationFrame(() => this.frame());

    this.mouseMove = this.mouseMove.bind(this);
    document.addEventListener("mousemove", this.mouseMove);

    this.generatePoints();
    this.connectPoints();
  }

  private generatePoints(): void {
    const sampleSize = GRID_SLACK * 2 + 1;

    const poisson = new PoissonDiskSampling({
      shape: [sampleSize, sampleSize],
      minDistance: MIN_POINT_DISTANCE / 2,
      distanceFunction: (p) => 1 - p[0] / sampleSize,
    });

    for (const [x, y] of poisson.fill()) {
      this.points.push(new Point(x - GRID_SLACK, y - GRID_SLACK));
    }
  }

  private connectPoints(): void {
    const delaunay = Delaunator.from(
      this.points,
      (p) => p.x,
      (p) => p.y,
    );

    for (let halfedge = 0; halfedge < delaunay.halfedges.length; halfedge++) {
      const opposite = delaunay.halfedges[halfedge];
      if (opposite > halfedge) continue;

      const next = halfedge % 3 === 2 ? halfedge - 2 : halfedge + 1;

      const a = this.points[delaunay.triangles[halfedge]];
      const b = this.points[delaunay.triangles[next]];

      const midX = (a.x + b.x) / 2;
      if (Math.random() > lerp(midX, MIN_LINE_CHANCE, MAX_LINE_CHANCE))
        continue;

      this.edges.push(new Edge(a, b));
    }
  }

  private frame(): void {
    this.frameCallback = requestAnimationFrame(() => this.frame());

    this.canvas.style.opacity = "1";

    if (this.canvas.width !== this.canvas.clientWidth) {
      this.canvas.width = this.canvas.clientWidth;
    }

    if (this.canvas.height !== this.canvas.clientHeight) {
      this.canvas.height = this.canvas.clientHeight;
    }

    const maxDim = Math.max(
      this.canvas.width,
      this.canvas.height,
      SCALING_THRESHOLD,
    );

    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.scale(maxDim, maxDim);

    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    this.ctx.lineWidth = LINE_SCALE;

    const time = performance.now() / 1000;
    const rect = this.canvas.getBoundingClientRect();

    const mouseX = (this.mouseX - rect.left) / maxDim;
    const mouseY = (this.mouseY - rect.top) / maxDim;

    for (const point of this.points) {
      point.wander(time, mouseX, mouseY);
    }

    for (const edge of this.edges) {
      edge.draw(this.ctx);
    }
  }

  private mouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  stop(): void {
    cancelAnimationFrame(this.frameCallback);
    document.removeEventListener("mousemove", this.mouseMove);
  }
}

class Point {
  readonly baseX: number;
  readonly baseY: number;

  readonly wanderAmp: number;
  readonly wanderFreq: number;

  readonly wanderOffsetX: number = random(MIN_WANDER_OFFSET, MAX_WANDER_OFFSET);
  readonly wanderOffsetY: number = random(MIN_WANDER_OFFSET, MAX_WANDER_OFFSET);

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.baseX = this.x = x;
    this.baseY = this.y = y;

    this.wanderAmp = lerp(x, MAX_WANDER_AMP, MIN_WANDER_AMP);
    this.wanderFreq = lerp(Math.random(), MAX_WANDER_FREQ, MIN_WANDER_FREQ);
  }

  wander(time: number, mouseX: number, mouseY: number): void {
    this.x =
      this.baseX +
      Math.sin(time * this.wanderFreq + this.wanderOffsetX) * this.wanderAmp;

    this.y =
      this.baseY +
      Math.sin(time * this.wanderFreq + this.wanderOffsetY) * this.wanderAmp;

    const toMouseX = mouseX - this.x;
    const toMouseY = mouseY - this.y;
    const mouseDist = Math.sqrt(toMouseX ** 2 + toMouseY ** 2);

    const pushStrength =
      (Math.exp(-((mouseDist / MOUSE_PUSH_SIZE / 2) ** 2)) /
        (MOUSE_PUSH_SIZE * Math.sqrt(Math.PI * 2))) *
      MOUSE_PUSH_STRENGTH;

    this.x += toMouseX * pushStrength;
    this.y += toMouseY * pushStrength;
  }

  distance(other: Point): number {
    const x = this.x - other.x;
    const y = this.y - other.y;
    return Math.sqrt(x ** 2 + y ** 2);
  }
}

class Edge {
  constructor(
    readonly a: Point,
    readonly b: Point,
  ) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
  }
}
