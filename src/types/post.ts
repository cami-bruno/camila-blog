export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  language: "es" | "en";
  readingTime?: number;
  featured?: boolean;
  keyTakeaways?: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: number;
}
