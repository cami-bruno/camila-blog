import type { Metadata } from "next";
import Link from "next/link";
import { AuroraHero } from "@/components/ui/AuroraHero";
import { GlowBorderCard } from "@/components/ui/GlowBorderCard";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";

export const metadata: Metadata = {
  title: "About",
  description:
    "Camila Bruno — Biotechnology Engineering student at Universidad ORT Uruguay. Background, interests, and contact.",
};

const skills = [
  { emoji: "🧫", label: "Lab protocols",           desc: "SOPs, pipetting, dilutions, electrophoresis prep",       glow: "rgba(34,211,238,0.3)"  },
  { emoji: "📓", label: "Result recording",         desc: "Lab notebook discipline, real-time data integrity",       glow: "rgba(52,211,153,0.3)"  },
  { emoji: "📋", label: "Procedure documentation",  desc: "Built at República AFAP — accuracy under pressure",      glow: "rgba(167,139,250,0.3)" },
  { emoji: "🇬🇧", label: "English C2",              desc: "Full proficiency — reads primary literature in English",  glow: "rgba(125,211,252,0.3)" },
  { emoji: "🔍", label: "Critical reading",         desc: "Evaluating papers, identifying disclaimers & limits",    glow: "rgba(251,191,36,0.3)"  },
  { emoji: "🇺🇾", label: "Spanish (native)",         desc: "Uruguayan Spanish, scientific writing in progress",      glow: "rgba(52,211,153,0.3)"  },
];

const studying = [
  { label: "Molecular diagnostics",  desc: "PCR, gel electrophoresis, restriction analysis",         accent: "#22d3ee" },
  { label: "Biochemistry",           desc: "Macromolecule structure and function",                   accent: "#34d399" },
  { label: "Genetics",               desc: "Mendelian inheritance, pedigree analysis, pop. genetics", accent: "#a78bfa" },
  { label: "Scientific writing",     desc: "Lab reporting in Spanish and English",                   accent: "#fbbf24" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero banner ─────────────────────────── */}
      <AuroraHero className="min-h-[260px] flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 fade-in w-full">
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3">About me</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-white glow-text">
            Hi, I&apos;m Camila 👋
          </h1>
          <p className="text-white/70 text-lg max-w-xl leading-relaxed">
            Biotechnology Engineering student · Montevideo, Uruguay · Interested in
            the science that directly changes human lives.
          </p>
        </div>
      </AuroraHero>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12">

        {/* ── Bio ─────────────────────────────────── */}
        <section className="mb-16 grid sm:grid-cols-3 gap-8" aria-label="Biography">
          <div className="sm:col-span-2 space-y-4 text-[color:var(--foreground)] leading-relaxed">
            <p>
              I&apos;m a 19-year-old <strong>Biotechnology Engineering student</strong> at{" "}
              <a href="https://www.ort.edu.uy" target="_blank" rel="noopener noreferrer"
                className="text-[color:var(--accent)] hover:opacity-80 transition-opacity underline underline-offset-2">
                Universidad ORT Uruguay
              </a>{" "}
              in Montevideo. Early semesters — building foundations — and genuinely excited about it.
            </p>
            <p>
              My main interest is the intersection of{" "}
              <strong className="text-[color:var(--accent-2)]">
                molecular biology and real human problems
              </strong>
              : how a single nucleotide change causes a lifetime of disease, how genetic
              information gets translated (or doesn&apos;t) into clinical decisions, and why access
              to treatments that already exist is still so unequal.
            </p>
            <p>
              I work in <strong>customer service at República AFAP</strong>, Uruguay&apos;s public
              pension fund. The job taught me to follow procedures precisely, document carefully,
              and communicate clearly under pressure — habits that map directly onto lab work.
            </p>
            <blockquote className="text-[color:var(--muted)] text-sm italic border-l-2 border-[color:var(--accent)] pl-4">
              This site is my thinking-out-loud space. Posts have disclaimers where
              appropriate — I&apos;m a student, not a clinician.
            </blockquote>
          </div>

          {/* Quick stats card */}
          <aside>
            <SpotlightCard
              spotlightColor="rgba(34,211,238,0.1)"
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 h-fit space-y-4"
            >
              {[
                { icon: "🎓", label: "Degree",    value: "Biotechnology Engineering" },
                { icon: "🏛️", label: "Uni",       value: "ORT Uruguay" },
                { icon: "📍", label: "Location",  value: "Montevideo, UY" },
                { icon: "💼", label: "Also",      value: "Customer service, AFAP" },
                { icon: "🌐", label: "Languages", value: "Spanish · English C2" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">{icon}</span>
                  <div>
                    <p className="text-xs text-[color:var(--muted)] font-medium">{label}</p>
                    <p className="text-sm font-semibold text-[color:var(--foreground)]">{value}</p>
                  </div>
                </div>
              ))}
            </SpotlightCard>
          </aside>
        </section>

        {/* ── Skills ─────────────────────────────── */}
        <section className="mb-16" aria-label="Skills">
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)] mb-5">
            Skills &amp; background
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((s) => (
              <TiltCard key={s.label}>
                <GlowBorderCard glowColor={s.glow} className="rounded-xl h-full">
                  <div className="p-4">
                    <p className="text-xl mb-1">{s.emoji}</p>
                    <p className="font-semibold text-sm text-[color:var(--foreground)] mb-1">{s.label}</p>
                    <p className="text-xs text-[color:var(--muted)] leading-relaxed">{s.desc}</p>
                  </div>
                </GlowBorderCard>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ── Currently studying ─────────────────── */}
        <section className="mb-16" aria-label="Currently studying">
          <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--muted)] mb-5">
            Currently studying
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {studying.map((s) => (
              <SpotlightCard
                key={s.label}
                spotlightColor={`${s.accent}20`}
                className="flex items-start gap-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 hover:border-white/15 transition-all"
              >
                <span
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: s.accent, boxShadow: `0 0 8px ${s.accent}` }}
                />
                <div>
                  <p className="font-semibold text-sm text-[color:var(--foreground)]">{s.label}</p>
                  <p className="text-xs text-[color:var(--muted)] mt-0.5">{s.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* ── Contact ────────────────────────────── */}
        <section aria-label="Contact">
          <GlowBorderCard className="rounded-2xl" glowColor="rgba(52,211,153,0.4)">
            <div className="p-6">
              <h2 className="text-lg font-bold text-[color:var(--foreground)] mb-1">Get in touch</h2>
              <p className="text-sm text-[color:var(--muted)] mb-5">
                Happy to connect with biotech students, educators, or anyone who finds this stuff as interesting as I do.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="mailto:camilabruno@example.com"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--accent-2)] text-[#020817] text-sm font-bold hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                  ✉️ Email me
                </a>
                <a href="https://linkedin.com/in/camilabruno" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[color:var(--border)] bg-transparent text-[color:var(--foreground)] text-sm font-semibold hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors">
                  LinkedIn
                </a>
                <Link href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[color:var(--border)] bg-transparent text-[color:var(--foreground)] text-sm font-semibold hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors">
                  Read the blog →
                </Link>
              </div>
            </div>
          </GlowBorderCard>
        </section>

      </div>
    </>
  );
}
