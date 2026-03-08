"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  hue: number;
}

const HUES  = [185, 162, 265];   // cyan · emerald · violet
const COUNT = 70;
const LINK  = 180;
const SPEED = 0.38;

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const ctx2: CanvasRenderingContext2D = ctx;

    let W = 0, H = 0;
    const dots: Dot[] = [];
    let raf = 0;

    function resize() {
      W = cvs!.width  = cvs!.offsetWidth;
      H = cvs!.height = cvs!.offsetHeight;
    }

    function init() {
      resize();
      dots.length = 0;
      for (let i = 0; i < COUNT; i++) {
        dots.push({
          x:   Math.random() * W,
          y:   Math.random() * H,
          vx:  (Math.random() - 0.5) * SPEED,
          vy:  (Math.random() - 0.5) * SPEED,
          r:   Math.random() * 2.2 + 1.2,
          hue: HUES[i % HUES.length],
        });
      }
    }

    function draw() {
      ctx2.clearRect(0, 0, W, H);

      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      }

      /* connections */
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK) {
            ctx2.beginPath();
            ctx2.moveTo(dots[i].x, dots[i].y);
            ctx2.lineTo(dots[j].x, dots[j].y);
            ctx2.strokeStyle = `hsla(${dots[i].hue},85%,68%,${((1 - dist / LINK) * 0.28).toFixed(3)})`;
            ctx2.lineWidth = 0.9;
            ctx2.stroke();
          }
        }
      }

      /* dots */
      for (const d of dots) {
        const grd = ctx2.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 5.5);
        grd.addColorStop(0, `hsla(${d.hue},90%,72%,0.22)`);
        grd.addColorStop(1, `hsla(${d.hue},90%,72%,0)`);
        ctx2.beginPath(); ctx2.arc(d.x, d.y, d.r * 5.5, 0, Math.PI * 2);
        ctx2.fillStyle = grd; ctx2.fill();

        ctx2.beginPath(); ctx2.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx2.fillStyle = `hsla(${d.hue},90%,80%,0.95)`; ctx2.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(init);
    ro.observe(cvs);
    init(); draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className={className}
      style={{ display: "block", width: "100%", height: "100%" }} />
  );
}
