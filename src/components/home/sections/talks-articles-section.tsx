import { PublicationSection } from "@/components/home/sections/publication-section";
import { talkArticlePublications } from "@/data/publication";

export function TalksArticlesSection() {
  return (
    <PublicationSection
      id="articles"
      eyebrow="Community"
      title="Talks & Articles"
      publications={talkArticlePublications}
      seeAllHref="/publications?category=talks-articles"
      emptyState={
        <div className="rounded-[22px] border border-[color:var(--line)] bg-white/75 px-6 py-7 text-sm leading-7 text-slate-700 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] max-[500px]:rounded-lg max-[500px]:px-4 max-[500px]:py-5 max-[500px]:text-xs">
          Study-group slides, workshop talks, and technical articles will live
          here.
        </div>
      }
    />
  );
}
