import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Post, PostMeta } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = fs.existsSync(path.join(POSTS_DIR, `${slug}.mdx`))
    ? path.join(POSTS_DIR, `${slug}.mdx`)
    : path.join(POSTS_DIR, `${slug}.md`);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: {
      title: data.title ?? "",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      tags: data.tags ?? [],
      language: data.language ?? "en",
      readingTime: data.readingTime ?? Math.ceil(stats.minutes),
      featured: data.featured ?? false,
      keyTakeaways: data.keyTakeaways ?? [],
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      return {
        slug,
        ...post.frontmatter,
        readingTime: post.frontmatter.readingTime ?? 1,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPosts(limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts().filter((p) => p.slug !== slug);
  const scored = allPosts.map((p) => ({
    ...p,
    score: p.tags.filter((t) => post.frontmatter.tags.includes(t)).length,
  }));
  return scored
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function buildSearchIndex(): PostMeta[] {
  return getAllPosts();
}
