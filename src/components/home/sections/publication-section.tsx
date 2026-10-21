import type { ReactNode } from "react";
import { PublicationEntry } from "@/components/publications/publication-entry";
import { SectionListFooter } from "@/components/home/section-list-footer";
import { SectionHeading } from "@/components/home/section-heading";
import type { Publication } from "@/lib/publications";

interface PublicationSectionProps {
  id: string;
  title: string;
  eyebrow: string;
  publications: Publication[];
  seeAllHref: string;
  emptyState?: ReactNode;
}

export function PublicationSection({
  id,
  title,
  eyebrow,
  publications,
  seeAllHref,
  emptyState,
}: PublicationSectionProps) {
  if (publications.length === 0 && !emptyState) {
    return null;
  }

  const featuredPublications = publications.slice(0, 5);

  return (
    <section id={id} className="min-w-0 max-w-full">
      <SectionHeading eyebrow={eyebrow} title={title} />
      {featuredPublications.length > 0 ? (
        <div className="min-w-0 max-w-full divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {featuredPublications.map((publication) => (
            <div key={publication.slug} className="py-2">
              <PublicationEntry publication={publication} />
            </div>
          ))}
        </div>
      ) : (
        emptyState
      )}
      <SectionListFooter
        shownCount={featuredPublications.length}
        totalCount={publications.length}
        href={seeAllHref}
      />
    </section>
  );
}
