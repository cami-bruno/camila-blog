import { cn } from "@/lib/cn";

interface AuroraHeroProps {
  children: React.ReactNode;
  className?: string;
}

export function AuroraHero({ children, className }: AuroraHeroProps) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0e0608]", className)}>
      {/* Static aurora layers */}
      <div className="pointer-events-none absolute inset-0 aurora-base" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
