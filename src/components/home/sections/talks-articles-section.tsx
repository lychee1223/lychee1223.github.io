import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PublicationEntry } from "@/components/publications/publication-entry";
import { SectionHeading } from "@/components/home/section-heading";
import { materialPublications } from "@/data/publication";

export function TalksArticlesSection() {
  const featuredPublications = materialPublications.slice(0, 5);
  const hasMorePublications =
    materialPublications.length > featuredPublications.length;

  return (
    <section id="articles" className="min-w-0 max-w-full">
      <SectionHeading eyebrow="Community" title="Talks & Articles" />
      {materialPublications.length > 0 ? (
        <div className="min-w-0 max-w-full space-y-9 max-[500px]:space-y-7">
          {featuredPublications.map((publication) => (
            <div key={publication.slug}>
              <PublicationEntry publication={publication} />
            </div>
          ))}
          {hasMorePublications && (
            <div className="pt-2">
              <div className="flex min-w-0 items-start justify-between gap-3 border-t border-[color:var(--line)] pt-4 sm:items-center">
                <p className="min-w-0 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
                  Latest {featuredPublications.length} of{" "}
                  {materialPublications.length}
                </p>
                <Link
                  href="/publications?category=material"
                  className="group inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full bg-[color:var(--surface-muted)] px-3 py-1.5 text-sm font-medium uppercase tracking-[0.14em] text-[color:var(--accent-strong)] transition-all duration-300 hover:bg-white hover:text-slate-950 hover:shadow-[0_10px_24px_-18px_rgba(37,99,235,0.45)] max-[500px]:px-2.5 max-[500px]:py-1 max-[500px]:text-xs max-[500px]:tracking-[0.1em]"
                >
                  <span>See All</span>
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-[22px] border border-[color:var(--line)] bg-white/75 px-6 py-7 text-sm leading-7 text-slate-700 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.28)] max-[500px]:rounded-lg max-[500px]:px-4 max-[500px]:py-5 max-[500px]:text-xs">
          Study-group slides, workshop talks, and technical articles will live
          here.
        </div>
      )}
    </section>
  );
}
