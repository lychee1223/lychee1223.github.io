"use client";

import { PublicationEntry } from "@/components/publications/publication-entry";
import { getAuthors } from "@/components/publications/render-authors";
import {
  isTalkOrArticle,
  publicationMatchesVenue,
  sortedPublicationData,
} from "@/data/publication";
import { useSearchParams } from "next/navigation";

type PublicationFilterCategory =
  | "international-conference"
  | "domestic-conference"
  | "article"
  | "talk"
  | "talks-articles"
  | "material";

function getCategoryParam(value: string | null) {
  if (
    value === "international-conference" ||
    value === "domestic-conference" ||
    value === "article" ||
    value === "talk" ||
    value === "talks-articles" ||
    value === "material"
  ) {
    return value satisfies PublicationFilterCategory;
  }

  return undefined;
}

export function PublicationsClientPage() {
  const searchParams = useSearchParams();
  const author = searchParams.get("author") ?? undefined;
  const category = getCategoryParam(searchParams.get("category"));
  const keyword = searchParams.get("keyword") ?? undefined;
  const venue = searchParams.get("venue") ?? undefined;
  const isTalkArticleFilter =
    category === "talks-articles" || category === "material";

  const filteredPublications = sortedPublicationData.filter((publication) => {
    if (author) {
      return publication.authors
        ? getAuthors(publication.authors).includes(author)
        : false;
    }

    if (category) {
      if (isTalkArticleFilter) {
        return isTalkOrArticle(publication);
      }

      return publication.category === category;
    }

    if (keyword) {
      return publication.keywords?.includes(keyword);
    }

    if (venue) {
      return publicationMatchesVenue(publication, venue);
    }

    return true;
  });

  const filterLabel = author
    ? `Author: ${author}`
    : category === "international-conference"
      ? "Category: International Conferences"
      : category === "domestic-conference"
        ? "Category: Domestic Conferences"
        : category === "article"
          ? "Category: Articles"
          : category === "talk"
            ? "Category: Talks"
            : isTalkArticleFilter
              ? "Category: Talks & Articles"
              : keyword
                ? `Keyword: ${keyword}`
                : venue
                  ? `Venue: ${venue}`
                  : "All Publications";

  return (
    <div className="min-h-screen bg-transparent">
      <main className="mx-auto max-w-screen-md px-5 py-20 sm:px-8">
        <section>
          <h1 className="font-serif text-3xl font-bold leading-snug text-zinc-900 mb-3">
            Publications
          </h1>
          <p className="text-sm text-zinc-700 mb-12">{filterLabel}</p>

          {filteredPublications.length > 0 ? (
            <div className="space-y-9">
              {filteredPublications.map((publication, index) => (
                <div key={publication.slug}>
                  <PublicationEntry publication={publication} />
                  {index < filteredPublications.length - 1 && (
                    <div className="my-6 h-px bg-zinc-200" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-700">
              No publications found for this filter.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}
