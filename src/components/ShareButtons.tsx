"use client";

import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-[color:var(--muted)]">Share:</span>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
      >
        {copied ? "✓ Copied!" : "Copy link"}
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
        aria-label="Share on Twitter/X"
      >
        Twitter / X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[color:var(--border)] text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
    </div>
  );
}
