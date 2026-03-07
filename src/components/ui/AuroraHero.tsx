import { cn } from "@/lib/cn";

interface AuroraHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function AuroraHero({ children, className }: AuroraHeroProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[#020817]", className)}>
      {/* Static aurora layers */}
      <div className="pointer-events-none absolute inset-0 aurora-base" />
      {/* Dot grid overlay */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
