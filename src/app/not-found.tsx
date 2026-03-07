import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="text-6xl font-bold text-[color:var(--accent)] mb-4">404</p>
      <h1 className="text-2xl font-bold text-[color:var(--foreground)] mb-3">
        Page not found
      </h1>
      <p className="text-[color:var(--muted)] mb-8 max-w-md mx-auto">
        This page doesn&apos;t exist — maybe the post was moved or the URL is wrong.
      </p>
      <div className="flex justify-center gap-3">
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-[color:var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Go home
        </Link>
        <Link
          href="/blog"
          className="px-4 py-2 rounded-lg border border-[color:var(--border)] text-[color:var(--foreground)] text-sm font-medium hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
        >
          Browse blog
        </Link>
      </div>
    </div>
  );
}
