"use client";

import { useEffect, useRef } from "react";

const CYAN = "0, 240, 255";
const MAGENTA = "255, 43, 214";
const ORANGE = "255, 106, 0";
const PINK = "255, 77, 158";

const HORIZON_RATIO = 0.38;
const VERTICAL_LINES = 25;
const HORIZONTAL_LINES = 22;
/** Fraction of the depth range travelled per second. */
const SPEED = 0.075;

/** LiDAR returns scattered over the ground plane. */
const GROUND_POINTS = 110;
/** Obstacle clusters: tight stacks of returns with vertical extent. */
const CLUSTER_COUNT = 4;
const CLUSTER_POINTS = 14;
/** Seconds for one outbound scan sweep. */
const SWEEP_PERIOD = 5;

type Star = { x: number; y: number; a: number; r: number };

type CloudPoint = {
  /** Lateral position in the same normalised space as the grid verticals. */
  xn: number;
  /** Depth slot in [0,1); drifts with the grid offset. */
  slot: number;
  /** Height above the ground plane, as a fraction of the ground depth. */
  h: number;
  obstacle: boolean;
};

/** The point cloud is normalised, so it survives resizes untouched. */
function makePointCloud(): CloudPoint[] {
  const points: CloudPoint[] = [];
  for (let i = 0; i < GROUND_POINTS; i++) {
    points.push({
      xn: (Math.random() - 0.5) * 0.7,
      slot: Math.random(),
      h: 0,
      obstacle: false,
    });
  }
  for (let c = 0; c < CLUSTER_COUNT; c++) {
    const xc = (Math.random() - 0.5) * 0.6;
    const sc = Math.random();
    for (let i = 0; i < CLUSTER_POINTS; i++) {
      points.push({
        xn: xc + (Math.random() - 0.5) * 0.05,
        slot: (sc + (Math.random() - 0.5) * 0.04 + 1) % 1,
        h: Math.random() * 0.16,
        obstacle: true,
      });
    }
  }
  return points;
}

/**
 * The outrun grid: horizontal lines rush toward the viewer while verticals
 * converge on a vanishing point. Rendered on a 2D canvas rather than WebGL,
 * which keeps the retro look at a fraction of the bundle and battery cost.
 *
 * Depth is a normalised z in [0,1]; the squared projection is what compresses
 * line spacing near the horizon and makes the perspective read correctly.
 */
export default function GridHorizon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    let width = 0;
    let height = 0;
    let horizon = 0;
    let stars: Star[] = [];
    let offset = 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    const cloud = makePointCloud();
    /** Sweep phase in [0,1); the scan wave travels away from the viewer. */
    let sweep = 0.35;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      horizon = height * HORIZON_RATIO;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Star field is regenerated on resize and then held static.
      const count = Math.round((width * horizon) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * horizon * 0.92,
        a: Math.random() * 0.4 + 0.1,
        r: Math.random() * 1.1 + 0.3,
      }));
    };

    /** Perspective projection: z=0 at the horizon, z=1 at the viewer. */
    const projectY = (z: number) => horizon + (height - horizon) * z * z;

    /**
     * Bloom is faked with a wide translucent pass under a thin bright one.
     * Canvas `shadowBlur` gives a nicer falloff but costs ~10x per stroke, and
     * with ~50 lines a frame it starves the main thread.
     */
    const drawGlowLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      rgb: string,
      alpha: number,
      lineWidth: number,
      spread: number,
    ) => {
      if (spread > 0) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${rgb}, ${alpha * 0.16})`;
        ctx.lineWidth = lineWidth + spread;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
      ctx.lineWidth = lineWidth;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Base wash: deep space above, violet→orange ground haze below.
      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "#05040f");
      bg.addColorStop(HORIZON_RATIO * 0.85, "#0a0618");
      bg.addColorStop(HORIZON_RATIO, "#1a0a28");
      bg.addColorStop(0.72, "#120818");
      bg.addColorStop(1, "#05040f");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (const s of stars) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(220, 235, 255, ${s.a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Horizon glow bar — cyan core with a soft orange bloom (outrun sunset).
      drawGlowLine(0, horizon, width, horizon, CYAN, 0.85, 1.4, 14);
      drawGlowLine(0, horizon, width, horizon, ORANGE, 0.28, 0.8, 22);

      ctx.save();
      const cx = width / 2;
      // Verticals fan out from the vanishing point to beyond the frame edges.
      for (let i = 0; i <= VERTICAL_LINES; i++) {
        const t = i / VERTICAL_LINES - 0.5;
        const spread = width * 2.6;
        const xBottom = cx + t * spread;
        const edgeFade = 1 - Math.min(Math.abs(t) * 1.7, 0.82);
        // No bloom pass on the verticals; they read as fine rules and the
        // extra ~25 strokes a frame are not worth it.
        drawGlowLine(
          cx,
          horizon,
          xBottom,
          height,
          CYAN,
          0.1 + edgeFade * 0.24,
          1,
          0,
        );
      }

      // Horizontals: each line owns a slot in depth and wraps around.
      for (let i = 0; i < HORIZONTAL_LINES; i++) {
        const z = ((i / HORIZONTAL_LINES + offset) % 1 + 1) % 1;
        const y = projectY(z);
        if (y < horizon || y > height + 2) continue;

        // Near lines shift through magenta → pink → orange like street neon.
        const near = z > 0.78;
        const mid = z > 0.55;
        const rgb = near ? ORANGE : mid ? (z > 0.68 ? PINK : MAGENTA) : CYAN;
        const alpha = 0.12 + z * 0.62;
        drawGlowLine(0, y, width, y, rgb, alpha, 0.6 + z * 1.9, 2 + z * 7);
      }

      // The scan wave: a faint wavefront expanding toward the horizon, with
      // LiDAR returns flashing as it passes through their depth band.
      const sweepZ = 1 - sweep;
      if (sweepZ > 0.03 && sweepZ < 0.97) {
        drawGlowLine(
          0,
          projectY(sweepZ),
          width,
          projectY(sweepZ),
          CYAN,
          0.09,
          1,
          10,
        );
      }

      // LiDAR returns ride the same depth field as the grid: cyan ground
      // returns, hot-orange obstacle clusters with a little vertical extent —
      // hazard neon against the cool grid.
      for (const p of cloud) {
        const z = ((p.slot + offset) % 1 + 1) % 1;
        if (z < 0.06) continue;
        const zz = z * z;
        const x = cx + p.xn * width * 2.6 * zz;
        if (x < -24 || x > width + 24) continue;
        const y = projectY(z) - p.h * (height - horizon) * zz;

        const flash = Math.abs(z - sweepZ) < 0.045;
        const rgb = p.obstacle ? ORANGE : CYAN;
        const alpha = flash ? 0.95 : 0.16 + z * (p.obstacle ? 0.72 : 0.5);
        const size = (p.obstacle ? 1.2 : 0.9) + z * 2.4 + (flash ? 1 : 0);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
      ctx.restore();
    };

    const frame = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      offset = (offset + dt * SPEED) % 1;
      sweep = (sweep + dt / SWEEP_PERIOD) % 1;
      render();
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || reduced) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    render();

    const onResize = () => {
      resize();
      render();
    };
    window.addEventListener("resize", onResize);

    // Stop burning frames once the hero has scrolled away.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (!reduced) start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
