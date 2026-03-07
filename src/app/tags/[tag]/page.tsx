import { notFound } from "next/navigation";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `All posts tagged with #${tag} on Camila Bruno's blog.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)] mb-3">
          Tag
        </p>
        <h1 className="text-3xl font-bold text-[color:var(--foreground)] mb-2">
          #{tag}
        </h1>
        <p className="text-sm text-[color:var(--muted)]">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
