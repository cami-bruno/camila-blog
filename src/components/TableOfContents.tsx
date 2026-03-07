"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TOCProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TOCProps) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;
    const ids = headings.map((h) => h.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="font-semibold text-[color:var(--foreground)] mb-3 text-xs uppercase tracking-wider">
        Contents
      </p>
      <ol className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 0.75}rem` }}>
            <a
              href={`#${h.id}`}
              className={`block text-sm leading-snug transition-colors hover:text-[color:var(--accent)] ${
                active === h.id
                  ? "text-[color:var(--accent)] font-medium"
                  : "text-[color:var(--muted)]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
