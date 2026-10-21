"use client";

import { useSearchParams } from "next/navigation";
import { PublicationEntry } from "@/components/publications/publication-entry";
import { getPublicationFilter } from "@/lib/publication-filters";
import type { PublicationListItem } from "@/lib/publications";

export function PublicationsClientPage({
  publications,
}: {
  publications: PublicationListItem[];
}) {
  const searchParams = useSearchParams();
  const filter = getPublicationFilter(searchParams);
  const filteredPublications = publications.filter(filter.matches);

  return (
    <div className="min-h-screen bg-transparent">
      <main className="mx-auto max-w-screen-md px-5 py-20 sm:px-8">
        <section>
          <h1 className="font-serif text-3xl font-bold leading-snug text-zinc-900 mb-3">
            Publications
          </h1>
          <p className="text-sm text-zinc-700 mb-12">{filter.label}</p>

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
