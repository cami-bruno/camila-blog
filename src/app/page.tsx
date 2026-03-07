import Link from "next/link";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { TagPill } from "@/components/TagPill";
import { AuroraHero } from "@/components/ui/AuroraHero";
import { ParticleField } from "@/components/ui/ParticleField";
import { DNAHelix } from "@/components/ui/DNAHelix";
import { TiltCard } from "@/components/ui/TiltCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { GlowBorderCard } from "@/components/ui/GlowBorderCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camila Bruno — Biotech Portfolio",
  description:
    "Biotechnology Engineering student at ORT Uruguay writing about biotech, genetics, and the science behind real human problems.",
};

const interests = [
  {
    emoji: "🧬",
    label: "Human Genetics",
    desc: "How one mutation can change a life — and how we're learning to intervene.",
    glow: "rgba(34,211,238,0.15)",
    accent: "#22d3ee",
  },
  {
    emoji: "🔬",
    label: "Lab Techniques",
    desc: "PCR, electrophoresis, dilutions — the unglamorous backbone of discovery.",
    glow: "rgba(52,211,153,0.15)",
    accent: "#34d399",
  },
  {
    emoji: "⚕️",
    label: "Diagnostics",
    desc: "The gap between knowing the science and reaching the patient.",
    glow: "rgba(167,139,250,0.15)",
    accent: "#a78bfa",
  },
  {
    emoji: "🌱",
    label: "Biotech Impact",
    desc: "Where does applied biotech actually show up in a country like Uruguay?",
    glow: "rgba(251,191,36,0.15)",
    accent: "#fbbf24",
  },
];

export default function HomePage() {
  const featured = getFeaturedPosts(3);
  const latest = featured.length >= 3 ? featured : getAllPosts().slice(0, 3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      {/* AuroraHero is a plain relative block — no flex so absolute children behave correctly */}
      <AuroraHero className="min-h-[560px]">

        {/* Particles — full coverage */}
        <ParticleField className="pointer-events-none absolute inset-0 opacity-20" />

        {/* DNA — right 40% of the viewport, never touches the left text */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden lg:flex items-center justify-center opacity-[0.09]"
          style={{ width: "42%" }}
        >
          <DNAHelix width={460} amplitude={100} period={140} viewHeight={660} speed={5} />
        </div>

        {/* Content row — vertically centred via flex on an inner full-height div */}
        <div className="relative z-10 flex items-center min-h-[560px]">
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
                A biotech student in Montevideo fascinated by human genetics,
                molecular diagnostics, and the science behind problems that actually matter.
                This is where I think out loud.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/blog"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[color:var(--accent)] text-[#020817] font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                  Read my thoughts →
                </Link>
                <Link href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm">
                  About me
                </Link>
              </div>
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
                Exploring{" "}
                <strong className="text-[color:var(--accent)]">
                  molecular diagnostics and PCR techniques
                </strong>{" "}
                in my Biochemistry course. Also going deep on{" "}
                <strong className="text-[color:var(--accent-2)]">
                  gene therapy access inequality
                </strong>{" "}
                — specifically what it means that we have a functional cure for sickle cell
                disease and 80% of patients can&apos;t afford it.
              </p>
            </SpotlightCard>
          </GlowBorderCard>
        </section>

        {/* ── Latest posts ──────────────────────────── */}
        <section className="mb-16" aria-label="Latest posts">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[color:var(--foreground)]">Latest posts</h2>
            <Link href="/blog"
              className="text-sm font-medium text-[color:var(--accent)] hover:opacity-80 transition-opacity">
              View all →
            </Link>
          </div>

          {latest.length === 0 ? (
            <p className="text-[color:var(--muted)] text-sm">No posts yet — check back soon!</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </section>

        {/* ── Browse by topic ───────────────────────── */}
        <section className="mb-16" aria-label="Browse by topic">
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)] mb-4">
            Browse by topic
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "genetics","lab-techniques","diagnostics",
              "molecular-biology","biotech-uruguay",
              "biochemistry","reflections","protocols",
            ].map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
