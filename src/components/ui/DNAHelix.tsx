"use client";

import { useEffect, useRef } from "react";

interface DNAHelixProps {
  className?: string;
  width?: number;
  amplitude?: number;
  period?: number;
  viewHeight?: number;
  speed?: number;
}

/**
 * Canvas-based 3D DNA double helix.
 * Each strand is rendered as gradient quads perpendicular to the segment
 * direction, simulating a round cylindrical tube.  Perspective foreshortening
 * (x-position and tube width) and depth-sorted painting give a convincing
 * 3-D look without WebGL.
 */
export function DNAHelix({
  className,
  width      = 116,
  amplitude  = 26,
  period     = 64,
  viewHeight = 300,
  speed      = 3,
}: DNAHelixProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── hi-dpi setup ── */
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = Math.round(width      * dpr);
    canvas.height = Math.round(viewHeight * dpr);
    canvas.style.width  = `${width}px`;
    canvas.style.height = `${viewHeight}px`;
    ctx.scale(dpr, dpr);

    const cx   = width / 2;
    const FOV  = 220;        // smaller → stronger perspective distortion
    const TR   = 6.5;        // base tube half-width at z = 0
    const STEP = 0.11;       // radians per segment  (smaller = smoother)
    const PI2  = Math.PI * 2;

    /* depth-normalised value: 0 (back) → 1 (front) */
    const dNorm = (z: number) => (z + amplitude) / (2 * amplitude);

    type Seg = {
      x1: number; y1: number;
      x2: number; y2: number;
      hw: number;       // half-width of quad
      depth: number;    // z for painter's sort
      cr: number; cg: number; cb: number;
      alpha: number;
    };

    function frame(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed    = (ts - startRef.current) / 1000;
      const scrollOff  = ((elapsed / speed) * period) % period;
      const numReps    = Math.ceil(viewHeight / period) + 3;

      ctx.clearRect(0, 0, width, viewHeight);

      const segs: Seg[] = [];

      for (let rep = -1; rep < numReps; rep++) {
        const yBase = rep * period - scrollOff;

        /* ── two helix strands ── */
        for (let strand = 0; strand < 2; strand++) {
          const phase = strand * Math.PI;
          const cr = strand === 0 ? 34  : 139;
          const cg = strand === 0 ? 211 :  92;
          const cb = strand === 0 ? 238 : 246;

          for (let ti = 0; ti < PI2; ti += STEP) {
            const t1   = ti          + phase;
            const t2   = ti + STEP   + phase;
            const tMid = ti + STEP * 0.5 + phase;

            const z1   = amplitude * Math.cos(t1);
            const z2   = amplitude * Math.cos(t2);
            const zMid = amplitude * Math.cos(tMid);

            const y1 = yBase + (ti          / PI2) * period;
            const y2 = yBase + ((ti + STEP) / PI2) * period;

            if (y1 < -12 && y2 < -12)                         continue;
            if (y1 > viewHeight + 12 && y2 > viewHeight + 12) continue;

            /* perspective scale per endpoint */
            const p1   = FOV / (FOV + z1);
            const p2   = FOV / (FOV + z2);
            const pMid = FOV / (FOV + zMid);

            const sx1 = cx + amplitude * Math.sin(t1)    * p1;
            const sx2 = cx + amplitude * Math.sin(t2)    * p2;

            /* tube half-width grows when strand comes toward viewer */
            const hw    = TR * pMid;
            /* front = bright / opaque; back = dim / transparent */
            const alpha = 0.08 + 0.92 * dNorm(zMid);

            segs.push({ x1: sx1, y1, x2: sx2, y2, hw, depth: zMid, cr, cg, cb, alpha });
          }
        }

        /* ── rungs every half-period (at t = π/2 and 3π/2) ── */
        for (let ri = 0; ri < 2; ri++) {
          const yRung = yBase + (0.25 + ri * 0.5) * period;
          if (yRung < -12 || yRung > viewHeight + 12) continue;

          /* at t = π/2 and 3π/2 the strands are at their widest; z = 0 */
          const sign = ri === 0 ? 1 : -1;
          const sxA  = cx + amplitude * sign;   // strand-1 end (z=0 → no foreshortening)
          const sxB  = cx - amplitude * sign;   // strand-2 end

          segs.push({
            x1: sxA, y1: yRung,
            x2: sxB, y2: yRung,
            hw: TR * 0.7,
            depth: 0,
            cr: 160, cg: 210, cb: 255,
            alpha: 0.40,
          });
        }
      }

      /* painter's algorithm: render farthest-first */
      segs.sort((a, b) => a.depth - b.depth);

      for (const seg of segs) {
        const { x1, y1, x2, y2, hw, cr, cg, cb, alpha } = seg;

        const dx  = x2 - x1;
        const dy  = y2 - y1;
        const len = Math.hypot(dx, dy);
        if (len < 0.3) continue;

        /* perpendicular unit vector × half-width */
        const nx = (-dy / len) * hw;
        const ny = ( dx / len) * hw;
        const mx = (x1 + x2) * 0.5;
        const my = (y1 + y2) * 0.5;

        /* ── wide glow halo (only for front-facing segments) ── */
        if (alpha > 0.70) {
          const scale = 2.6;
          const glow  = ctx.createLinearGradient(
            mx + nx * scale, my + ny * scale,
            mx - nx * scale, my - ny * scale,
          );
          glow.addColorStop(0,   `rgba(${cr},${cg},${cb},0)`);
          glow.addColorStop(0.5, `rgba(${cr},${cg},${cb},${alpha * 0.10})`);
          glow.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
          ctx.beginPath();
          ctx.moveTo(x1 + nx * scale, y1 + ny * scale);
          ctx.lineTo(x2 + nx * scale, y2 + ny * scale);
          ctx.lineTo(x2 - nx * scale, y2 - ny * scale);
          ctx.lineTo(x1 - nx * scale, y1 - ny * scale);
          ctx.closePath();
          ctx.fillStyle = glow;
          ctx.fill();
        }

        /* ── main tube quad: cylindrical shading via perpendicular gradient ── */
        const grad = ctx.createLinearGradient(
          mx + nx, my + ny,
          mx - nx, my - ny,
        );
        // edge (dark) → shoulder (colour) → spine (white highlight) → shoulder → edge
        grad.addColorStop(0,    `rgba(${cr},${cg},${cb},0)`);
        grad.addColorStop(0.14, `rgba(${cr},${cg},${cb},${alpha * 0.50})`);
        grad.addColorStop(0.38, `rgba(255,255,255,${alpha * 0.95})`);
        grad.addColorStop(0.62, `rgba(255,255,255,${alpha * 0.95})`);
        grad.addColorStop(0.86, `rgba(${cr},${cg},${cb},${alpha * 0.50})`);
        grad.addColorStop(1,    `rgba(${cr},${cg},${cb},0)`);

        ctx.beginPath();
        ctx.moveTo(x1 + nx, y1 + ny);
        ctx.lineTo(x2 + nx, y2 + ny);
        ctx.lineTo(x2 - nx, y2 - ny);
        ctx.lineTo(x1 - nx, y1 - ny);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, amplitude, period, viewHeight, speed]);

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        width,
        height:   viewHeight,
        overflow: "hidden",
        position: "relative",
        /* fade top & bottom edges */
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
