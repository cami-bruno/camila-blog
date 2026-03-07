import { getAllPosts } from "@/lib/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://camilabruno.vercel.app";

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date + "T00:00:00").toUTCString()}</pubDate>
      <language>${post.language === "es" ? "es-UY" : "en-US"}</language>
      ${post.tags.map((t) => `<category>${t}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Camila Bruno — Biotech Lab Notebook</title>
    <link>${siteUrl}</link>
    <description>Biotechnology Engineering student at ORT Uruguay. Writing about biotech, genetics, and lab life.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
