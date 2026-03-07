# Camila Bruno — Biotech Lab Notebook

Personal blog for Camila Bruno, Biotechnology Engineering student at Universidad ORT Uruguay.

Built with **Next.js 16 (App Router)** · **TypeScript** · **Tailwind CSS** · **MDX**

---

## Quick start

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Type-check
npx tsc --noEmit

# Production build
npm run build
npm start
```

---

## Adding a new post

1. Create a file in `content/posts/your-slug.mdx`
2. Add frontmatter at the top:

```mdx
---
title: "Your Post Title"
date: "2025-12-15"
excerpt: "A one-sentence description shown in post cards and meta tags."
tags: ["genetics", "lab-techniques"]
language: "en"          # "en" or "es"
featured: false         # set true to appear on the home page (up to 3)
keyTakeaways:           # optional — renders a highlighted box at the top
  - "First takeaway"
  - "Second takeaway"
---

Your post content here in Markdown...
```

3. Use any Markdown syntax plus the `<Callout>` component:

```mdx
<Callout type="info" title="Note">
  This is an info callout. Types: info | warning | tip
</Callout>
```

4. The post will appear automatically in /blog, /tags/[tag], search, RSS, and sitemap.

---

## Project structure

```
camila-blog/
├── content/
│   └── posts/          # MDX post files
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home
│   │   ├── blog/page.tsx         # Blog listing
│   │   ├── blog/[slug]/page.tsx  # Individual post
│   │   ├── about/page.tsx        # About page
│   │   ├── search/page.tsx       # Search
│   │   ├── tags/[tag]/page.tsx   # Tag pages
│   │   ├── rss.xml/route.ts      # RSS feed
│   │   └── sitemap.ts            # Sitemap
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx
│   │   ├── TagPill.tsx
│   │   ├── LanguageBadge.tsx
│   │   ├── Callout.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/
│   │   └── posts.ts    # Post data utilities
│   └── types/
│       └── post.ts     # TypeScript interfaces
```

---

## Deploy to Vercel

1. Push to GitHub
2. Go to vercel.com → New Project → Import your repo
3. Add environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
4. Deploy — Vercel auto-detects Next.js

## Deploy to Netlify

1. Push to GitHub
2. Go to Netlify → Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variable: `NEXT_PUBLIC_SITE_URL=https://your-domain.netlify.app`

---

## Customization

| What | Where |
|------|-------|
| Site colors / dark mode palette | `src/app/globals.css` (CSS variables) |
| "Now" card content | `src/app/page.tsx` |
| About page bio | `src/app/about/page.tsx` |
| Email / LinkedIn links | `src/components/Footer.tsx` and `src/app/about/page.tsx` |
| Site URL (for RSS, OG, sitemap) | `.env.local` → `NEXT_PUBLIC_SITE_URL` |

---

## Features

- Dark mode toggle (persists via localStorage)
- Mobile-first responsive layout
- Client-side search over titles, excerpts, tags
- Tag and language filtering on blog list
- Table of contents with active section tracking
- Related posts by shared tags
- Share buttons (copy link, Twitter/X, LinkedIn)
- Key takeaways callout from frontmatter
- RSS feed at /rss.xml
- XML sitemap at /sitemap.xml
- JSON-LD structured data on each post
- Per-page Open Graph meta tags
- Skip-to-content link for accessibility
- WCAG AA contrast

---

Content (c) Camila Bruno.
