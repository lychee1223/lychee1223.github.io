import { PublicationEntry } from "@/components/publications/publication-entry";
import { SectionSeeAllLink } from "@/components/home/section-see-all-link";
import { SectionHeading } from "@/components/home/section-heading";
import { talkArticlePublications } from "@/data/publication";

export function TalksArticlesSection() {
  const featuredPublications = talkArticlePublications.slice(0, 5);
  const hasMorePublications =
    talkArticlePublications.length > featuredPublications.length;

  return (
    <section id="articles" className="min-w-0 max-w-full">
      <SectionHeading eyebrow="Community" title="Talks & Articles" />
      {talkArticlePublications.length > 0 ? (
        <div className="min-w-0 max-w-full divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
          {featuredPublications.map((publication) => (
            <div key={publication.slug} className="py-2">
              <PublicationEntry publication={publication} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[22px] border border-[color:var(--line)] bg-white/75 px-6 py-7 text-sm leading-7 text-slate-700 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] max-[500px]:rounded-lg max-[500px]:px-4 max-[500px]:py-5 max-[500px]:text-xs">
          Study-group slides, workshop talks, and technical articles will live
          here.
        </div>
      )}
      {talkArticlePublications.length > 0 && hasMorePublications && (
        <div className="pt-4">
          <div className="flex min-w-0 items-start justify-between gap-3 sm:items-center">
            <p className="min-w-0 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
              Latest {featuredPublications.length} of{" "}
              {talkArticlePublications.length}
            </p>
            <SectionSeeAllLink href="/publications?category=talks-articles" />
          </div>
        </div>
      )}
    </section>
  );
}
