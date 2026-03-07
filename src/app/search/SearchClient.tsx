"use client";

import { useState, useMemo } from "react";
import type { PostMeta } from "@/types/post";
import { PostCard } from "@/components/PostCard";

interface SearchClientProps {
  index: PostMeta[];
}

export function SearchClient({ index }: SearchClientProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query, index]);

  return (
    <div>
      <div className="relative mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-3 pl-10 rounded-xl border border-[color:var(--border)] bg-[color:var(--background)] text-[color:var(--foreground)] placeholder:text-[color:var(--muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:border-transparent text-sm"
          aria-label="Search posts"
          autoFocus
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--muted)]"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {query.trim() === "" ? (
        <p className="text-[color:var(--muted)] text-sm text-center py-8">
          Start typing to search {index.length} posts…
        </p>
      ) : results.length === 0 ? (
        <p className="text-[color:var(--muted)] text-sm text-center py-8">
          No posts found for &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div>
          <p className="text-xs text-[color:var(--muted)] mb-4">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
