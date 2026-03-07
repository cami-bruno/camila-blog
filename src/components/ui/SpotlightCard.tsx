"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/cn";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(6,182,212,0.12)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOpacity(0)}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
