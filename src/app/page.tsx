import Link from "next/link";
import { AuroraHero } from "@/components/ui/AuroraHero";
import { ParticleField } from "@/components/ui/ParticleField";
import { DNAHelix } from "@/components/ui/DNAHelix";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GlowBorderCard } from "@/components/ui/GlowBorderCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cami Bruno",
  description:
    "Biotechnology Engineering student at ORT Uruguay writing about genetics, diagnostics, and the science behind things that actually matter.",
};

const interests = [
  {
    emoji: "🧬",
    label: "Human Genetics",
    desc: "The idea that one base pair change can completely rewrite someone's life is still wild to me. I keep coming back to it.",
    glow: "rgba(34,211,238,0.15)",
  },
  {
    emoji: "🔬",
    label: "Lab Techniques",
    desc: "PCR, gel electrophoresis, dilutions — not glamorous, but once you get why they work, everything clicks a little more.",
    glow: "rgba(139,92,246,0.15)",
  },
  {
    emoji: "⚕️",
    label: "Diagnostics",
    desc: "There's a gap between figuring something out in a lab and actually getting it to a patient. That gap bothers me.",
    glow: "rgba(52,211,153,0.15)",
  },
  {
    emoji: "🌱",
    label: "Biotech in Uruguay",
    desc: "I'm from here. Biotech doesn't always reach places like this, and I think about that more than I probably should.",
    glow: "rgba(251,191,36,0.15)",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <AuroraHero className="min-h-screen">

        <ParticleField className="pointer-events-none absolute inset-0 opacity-20" />

        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden lg:flex items-center justify-center opacity-[0.09]"
          style={{ width: "42%" }}
        >
          <DNAHelix width={460} amplitude={100} period={140} viewHeight={660} speed={5} />
        </div>

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-24">
            <div className="max-w-lg fade-in">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-wide mb-6 backdrop-blur-sm border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Biotechnology Engineering · ORT Uruguay
              </span>

              <h1 className="text-4xl sm:text-6xl font-extrabold leading-none tracking-tight mb-4 text-white">
                Hi, I&apos;m<br />
                <span className="glow-text text-[color:var(--accent)]">Cami Bruno</span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed mb-8">
                I&apos;m a biotech engineering student at ORT Uruguay who spends too much
                time reading papers I half-understand and asking why good science
                doesn&apos;t reach more people. This is where I write while I figure it out.
              </p>

              <Link href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[color:var(--accent)] text-white font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_30px_rgba(34,211,238,0.55)]">
                Read my thoughts →
              </Link>
            </div>
          </div>
        </div>

      </AuroraHero>

      <div className="max-w-5xl mx-auto px-4 sm:px-8">

        {/* ── What I care about ─────────────────────── */}
        <section className="mt-16 mb-16" aria-label="Interests">
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)] mb-5">
            What I care about
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {interests.map((item) => (
              <TiltCard key={item.label}>
                <SpotlightCard
                  spotlightColor={item.glow}
                  className="h-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 hover:border-white/15 transition-all duration-200"
                >
                  <p className="text-2xl mb-2">{item.emoji}</p>
                  <p className="font-bold text-sm text-[color:var(--foreground)] mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-[color:var(--muted)] leading-relaxed">
                    {item.desc}
                  </p>
                </SpotlightCard>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── Now card ──────────────────────────────── */}
        <section className="mb-16" aria-label="Currently exploring">
          <GlowBorderCard className="rounded-2xl" glowColor="rgba(34,211,238,0.4)">
            <SpotlightCard spotlightColor="rgba(34,211,238,0.08)" className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
                  Now — March 2026
                </span>
              </div>
              <p className="text-[color:var(--foreground)] leading-relaxed">
                Currently neck-deep in{" "}
                <strong className="text-[color:var(--accent)]">
                  PCR and molecular diagnostics
                </strong>{" "}
                for my Biochemistry class — finally starting to understand why it works,
                not just how. Also can&apos;t stop thinking about{" "}
                <strong className="text-[color:var(--accent-2)]">
                  gene therapy access
                </strong>
                : we have a functional cure for sickle cell disease and 80% of patients
                can&apos;t afford it. That&apos;s the kind of thing that makes me want to
                keep going.
              </p>
            </SpotlightCard>
          </GlowBorderCard>
        </section>

      </div>
    </>
  );
}
