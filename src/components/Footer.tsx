import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--border)] mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[color:var(--muted)]">
        <p>© {year} Cami Bruno — Biotechnology Engineering student, ORT Uruguay</p>
        <div className="flex items-center gap-4">
          <a
            href="mailto:cbruno@contact.bio"
            className="hover:text-[color:var(--accent)] transition-colors"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/camila-bruno-29472a268"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[color:var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
