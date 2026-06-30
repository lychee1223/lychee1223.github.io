import { PublicationEntry } from "@/components/publications/publication-entry";
import { SectionSeeAllLink } from "@/components/home/section-see-all-link";
import { SectionHeading } from "@/components/home/section-heading";
import type { Publication } from "@/data/publication";

interface PublicationSectionProps {
  id: string;
  title: string;
  eyebrow: string;
  publications: Publication[];
  seeAllHref: string;
}

export function PublicationSection({
  id,
  title,
  eyebrow,
  publications,
  seeAllHref,
}: PublicationSectionProps) {
  if (publications.length === 0) {
    return null;
  }

  const featuredPublications = publications.slice(0, 5);
  const hasMorePublications = publications.length > featuredPublications.length;

  return (
    <section id={id} className="min-w-0 max-w-full">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="min-w-0 max-w-full divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {featuredPublications.map((publication) => (
          <div key={publication.slug} className="py-2">
            <PublicationEntry publication={publication} />
          </div>
        ))}
      </div>
      {hasMorePublications && (
        <div className="pt-4">
          <div className="flex min-w-0 items-start justify-between gap-3 sm:items-center">
            <p className="min-w-0 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
              Latest {featuredPublications.length} of {publications.length}
            </p>
            <SectionSeeAllLink href={seeAllHref} />
          </div>
        </div>
      )}
    </section>
  );
}
