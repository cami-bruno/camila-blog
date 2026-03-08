"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/",     label: "Home" },
  { href: "/blog", label: "Posts" },
];

export function Navbar() {
  const pathname  = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[color:var(--background)]/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* DNA double-helix icon */}
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"
            className="text-[color:var(--accent)] transition-all duration-300 group-hover:rotate-12 group-hover:drop-shadow-[0_0_6px_rgba(244,114,182,0.75)]">
            <circle cx="7"  cy="4"  r="2.5" fill="currentColor" opacity="0.9"/>
            <circle cx="15" cy="11" r="2.5" fill="currentColor" opacity="0.7"/>
            <circle cx="7"  cy="18" r="2.5" fill="currentColor" opacity="0.9"/>
            <path d="M7 4 Q11 7.5 15 11 Q11 14.5 7 18"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
            <circle cx="15" cy="4"  r="2.5" fill="currentColor" opacity="0.5"/>
            <circle cx="7"  cy="11" r="2.5" fill="currentColor" opacity="0.7"/>
            <circle cx="15" cy="18" r="2.5" fill="currentColor" opacity="0.5"/>
            <path d="M15 4 Q11 7.5 7 11 Q11 14.5 15 18"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
          </svg>
          <span className="font-bold text-[color:var(--foreground)] tracking-tight group-hover:text-[color:var(--accent)] transition-colors text-sm sm:text-base">
            Cami Bruno
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={href} href={href}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "text-[color:var(--accent)]"
                    : "text-[color:var(--muted)] hover:text-[color:var(--foreground)] hover:bg-white/5"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-px rounded-full bg-[color:var(--accent)] shadow-[0_0_6px_rgba(34,211,238,0.85)]" />
                )}
              </Link>
            );
          })}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-1">
          <ThemeToggle />
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="p-2 rounded-lg text-[color:var(--muted)] hover:text-[color:var(--foreground)] hover:bg-white/5 transition-colors">
            {menuOpen
              ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-white/8 bg-[color:var(--background)]/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-1"
          aria-label="Mobile navigation">
          {navLinks.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "text-[color:var(--accent)] bg-white/5"
                    : "text-[color:var(--muted)] hover:text-[color:var(--foreground)] hover:bg-white/5"
                }`}>
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
