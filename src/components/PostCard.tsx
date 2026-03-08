import Link from "next/link";
import type { PostMeta } from "@/types/post";
import { TagPill } from "./TagPill";
import { SpotlightCard } from "./ui/SpotlightCard";

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = new Date(post.date + "T00:00:00").toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <SpotlightCard
      spotlightColor="rgba(34,211,238,0.14)"
      className="group relative flex flex-col rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] overflow-hidden hover:-translate-y-1 hover:border-white/15 transition-all duration-300 fade-in"
    >
      {/* Coloured top bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 to-violet-500" />

      <div className="flex flex-col flex-1 p-5">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3">
          <time dateTime={post.date} className="text-xs text-[color:var(--muted)]">
            {formattedDate}
          </time>
          <span className="text-xs text-[color:var(--muted)]">
            · {post.readingTime} min read
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="flex-1">
          <h2 className="text-base font-bold text-[color:var(--foreground)] group-hover:text-[color:var(--accent)] transition-colors leading-snug mb-2">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-[color:var(--muted)] line-clamp-2 mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {post.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}
