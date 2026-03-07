import { getAllPosts, getAllTags } from "@/lib/posts";
import { BlogList } from "./BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "All posts by Camila Bruno — biotech, genetics, lab notes, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[color:var(--foreground)] mb-2">
          Blog
        </h1>
        <p className="text-[color:var(--muted)] text-sm">
          {posts.length} post{posts.length !== 1 ? "s" : ""} — sorted by newest
          first
        </p>
      </div>

      <BlogList posts={posts} tags={tags} />
    </div>
  );
}
