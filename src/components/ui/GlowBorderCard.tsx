"use client";

import { cn } from "@/lib/cn";

interface GlowBorderCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowBorderCard({
  children,
  className,
  glowColor = "rgba(6,182,212,0.5)",
}: GlowBorderCardProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Animated glow border via pseudo-like wrapper */}
      <div
        className="absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, transparent 50%, ${glowColor})`,
        }}
      />
      <div className="relative rounded-[inherit] bg-[#0d1117] border border-white/8">
        {children}
      </div>
    </div>
  );
}
