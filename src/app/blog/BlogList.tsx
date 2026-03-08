"use client";

import { useState, useMemo } from "react";
import type { PostMeta } from "@/types/post";
import { PostCard } from "@/components/PostCard";

interface BlogListProps {
  posts: PostMeta[];
  tags: string[];
}

const PAGE_SIZE = 6;

export function BlogList({ posts, tags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) =>
      p.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase())
    );
  }, [posts, activeTag]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const toggleTag = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
    setPage(1);
  };

  return (
    <div>
      {/* Tag filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center mb-8">
          <span className="text-xs font-medium text-[color:var(--muted)] uppercase tracking-wide mr-1">Topics:</span>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors border ${
                activeTag === tag
                  ? "bg-[color:var(--accent)] text-white border-[color:var(--accent)]"
                  : "bg-[color:var(--card)] text-[color:var(--muted)] border-[color:var(--border)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              }`}
            >
              #{tag}
            </button>
          ))}
          {activeTag && (
            <button
              onClick={() => { setActiveTag(null); setPage(1); }}
              className="text-xs text-[color:var(--muted)] underline hover:text-[color:var(--foreground)]"
            >
              Clear filter
            </button>
          )}
        </div>
      )}

      {/* Post list */}
      {filtered.length === 0 ? (
        <p className="text-[color:var(--muted)] text-sm py-8 text-center">
          No posts found for the selected filter.
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {paginated.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-5 py-2.5 rounded-lg border border-[color:var(--border)] text-sm font-medium text-[color:var(--foreground)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
              >
                Load more ({filtered.length - paginated.length} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
