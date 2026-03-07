import { buildSearchIndex } from "@/lib/posts";
import { SearchClient } from "./SearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search all posts on Camila Bruno's biotech blog.",
};

export default function SearchPage() {
  const index = buildSearchIndex();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[color:var(--foreground)] mb-2">
          Search
        </h1>
        <p className="text-sm text-[color:var(--muted)]">
          Search across titles, excerpts, and tags.
        </p>
      </div>
      <SearchClient index={index} />
    </div>
  );
}
