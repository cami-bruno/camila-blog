"use client";

import { motion } from "framer-motion";

const CX   = 150;
const CY   = 150;
const SIZE = 300;

export function MolecularOrb({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        width={SIZE} height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        overflow="visible"
      >
        <defs>
          {/* Core radial glow */}
          <radialGradient id="orb-core" cx="42%" cy="38%" r="58%">
            <stop offset="0%"   stopColor="#a5f3fc" stopOpacity="0.95" />
            <stop offset="45%"  stopColor="#22d3ee" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0"    />
          </radialGradient>
          {/* Wide outer halo */}
          <radialGradient id="orb-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"    />
          </radialGradient>
          {/* Violet halo */}
          <radialGradient id="orb-halo2" cx="60%" cy="60%" r="55%">
            <stop offset="0%"   stopColor="#a78bfa" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"    />
          </radialGradient>
        </defs>

        {/* Wide outer halos */}
        <circle cx={CX} cy={CY} r={148} fill="url(#orb-halo)"  />
        <circle cx={CX} cy={CY} r={130} fill="url(#orb-halo2)" />

        {/* ── Ring 1 — flat, fast, cyan ────────────── */}
        <g transform={`translate(${CX} ${CY})`}>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          >
            <ellipse rx={118} ry={30} fill="none"
              stroke="rgba(34,211,238,0.40)" strokeWidth={1.3} />
            {/* leading dot */}
            <circle cx={118} cy={0} r={5.5}
              fill="#22d3ee" />
            <circle cx={118} cy={0} r={10}
              fill="rgba(34,211,238,0.25)" />
            {/* trailing dot */}
            <circle cx={-118} cy={0} r={3}
              fill="rgba(34,211,238,0.55)" />
          </motion.g>
        </g>

        {/* ── Ring 2 — tilted 55°, medium, violet ──── */}
        <g transform={`translate(${CX} ${CY}) rotate(55)`}>
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <ellipse rx={100} ry={42} fill="none"
              stroke="rgba(167,139,250,0.32)" strokeWidth={1.1} />
            <circle cx={100} cy={0} r={4.5}
              fill="#a78bfa" />
            <circle cx={100} cy={0} r={9}
              fill="rgba(167,139,250,0.22)" />
          </motion.g>
        </g>

        {/* ── Ring 3 — tilted -35°, slow, emerald ──── */}
        <g transform={`translate(${CX} ${CY}) rotate(-35)`}>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            <ellipse rx={135} ry={55} fill="none"
              stroke="rgba(52,211,153,0.22)" strokeWidth={1} />
            <circle cx={135} cy={0} r={4}
              fill="#34d399" />
            <circle cx={135} cy={0} r={8}
              fill="rgba(52,211,153,0.20)" />
            <circle cx={-135} cy={0} r={2.5}
              fill="rgba(52,211,153,0.45)" />
          </motion.g>
        </g>

        {/* ── Core sphere ─────────────────────────── */}
        <circle cx={CX} cy={CY} r={62} fill="url(#orb-core)" />

        {/* Sphere border */}
        <circle cx={CX} cy={CY} r={42}
          fill="rgba(34,211,238,0.06)"
          stroke="rgba(34,211,238,0.38)" strokeWidth={1.5} />

        {/* Inner detail ring */}
        <circle cx={CX} cy={CY} r={26}
          fill="none"
          stroke="rgba(34,211,238,0.18)" strokeWidth={1} strokeDasharray="4 6" />

        {/* Pulsing center */}
        <motion.circle cx={CX} cy={CY}
          fill="#67e8f9"
          animate={{ r: [7, 11, 7], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Small fast satellite */}
        <g transform={`translate(${CX} ${CY})`}>
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <circle cx={0} cy={-42} r={3} fill="rgba(103,232,249,0.9)" />
            <circle cx={0} cy={-42} r={6} fill="rgba(103,232,249,0.2)" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
