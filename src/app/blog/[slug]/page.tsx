import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { TagPill } from "@/components/TagPill";
import { LanguageBadge } from "@/components/LanguageBadge";
import { ShareButtons } from "@/components/ShareButtons";
import { PostCard } from "@/components/PostCard";
import { TableOfContents } from "@/components/TableOfContents";
import { Callout } from "@/components/Callout";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://camilabruno.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      openGraph: {
        type: "article",
        title: post.frontmatter.title,
        description: post.frontmatter.excerpt,
        publishedTime: post.frontmatter.date,
        tags: post.frontmatter.tags,
      },
      alternates: { canonical: `${siteUrl}/blog/${slug}` },
    };
  } catch {
    return { title: "Post not found" };
  }
}

function extractHeadings(content: string) {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ id, text, level });
  }
  return headings;
}

const mdxComponents = {
  Callout,
};

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = post;
  const related = getRelatedPosts(slug, 3);
  const headings = extractHeadings(content);
  const postUrl = `${siteUrl}/blog/${slug}`;

  const formattedDate = new Date(frontmatter.date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    author: {
      "@type": "Person",
      name: "Camila Bruno",
      url: siteUrl,
    },
    url: postUrl,
    keywords: frontmatter.tags.join(", "),
    inLanguage: frontmatter.language === "es" ? "es-UY" : "en-US",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex gap-12">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <LanguageBadge language={frontmatter.language} />
                {frontmatter.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} />
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[color:var(--foreground)] leading-tight mb-4">
                {frontmatter.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                <time dateTime={frontmatter.date}>{formattedDate}</time>
                <span>·</span>
                <span>{frontmatter.readingTime} min read</span>
              </div>
            </header>

            {/* Key takeaways */}
            {frontmatter.keyTakeaways && frontmatter.keyTakeaways.length > 0 && (
              <div className="mb-8 bg-[color:var(--card)] border border-[color:var(--border)] rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--accent)] mb-3">
                  Key takeaways
                </p>
                <ul className="space-y-2">
                  {frontmatter.keyTakeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[color:var(--foreground)]">
                      <span className="text-[color:var(--accent)] font-bold mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MDX content */}
            <div className="prose">
              <MDXRemote source={content} components={mdxComponents} />
            </div>

            {/* Share */}
            <div className="mt-10 pt-6 border-t border-[color:var(--border)]">
              <ShareButtons title={frontmatter.title} url={postUrl} />
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="text-lg font-bold text-[color:var(--foreground)] mb-4">
                  Related posts
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <PostCard key={r.slug} post={r} />
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar TOC (desktop) */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-52 shrink-0">
              <div className="sticky top-20">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
