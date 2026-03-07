import Link from "next/link";

interface TagPillProps {
  tag: string;
  clickable?: boolean;
}

const tagColorMap: Record<string, string> = {
  genetics:            "tag-teal",
  diagnostics:         "tag-teal",
  "molecular-biology": "tag-teal",
  "lab-techniques":    "tag-emerald",
  protocols:           "tag-emerald",
  biochemistry:        "tag-emerald",
  reflections:         "tag-violet",
  "biotech-uruguay":   "tag-violet",
  "genetic-risk":      "tag-sky",
};

function getTagColor(tag: string): string {
  return tagColorMap[tag.toLowerCase()] ?? "tag-sky";
}

export function TagPill({ tag, clickable = true }: TagPillProps) {
  const slug = tag.toLowerCase().replace(/\s+/g, "-");
  const colorClass = getTagColor(slug);
  const className = `inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:opacity-90 hover:scale-105 ${colorClass}`;

  if (clickable) {
    return (
      <Link href={`/tags/${slug}`} className={className}>
        #{tag}
      </Link>
    );
  }
  return <span className={className}>#{tag}</span>;
}
