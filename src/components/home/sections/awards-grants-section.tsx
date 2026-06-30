import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AwardGrantEntry } from "@/components/awards-grants/award-grant-entry";
import { SectionHeading } from "@/components/home/section-heading";
import { awardsGrants } from "@/data/awards-grants";

const homepageAwardGrantLimit = 3;

export function AwardsGrantsSection() {
  const homepageAwardsGrants = awardsGrants.slice(0, homepageAwardGrantLimit);
  const hasMoreAwardsGrants = awardsGrants.length > homepageAwardsGrants.length;

  if (homepageAwardsGrants.length === 0) {
    return null;
  }

  return (
    <section id="awards-grants" className="min-w-0 max-w-full">
      <SectionHeading eyebrow="Recognition" title="Awards & Grants" />
      <div className="min-w-0 max-w-full divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {homepageAwardsGrants.map((item, index) => (
          <AwardGrantEntry
            key={`${item.date}-${item.title}-${index}`}
            item={item}
            index={index}
          />
        ))}
      </div>
      {hasMoreAwardsGrants && (
        <div className="pt-4">
          <div className="flex min-w-0 items-start justify-between gap-3 sm:items-center">
            <p className="min-w-0 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
              Latest {homepageAwardsGrants.length} of {awardsGrants.length}
            </p>
            <Link
              href="/awards-grants"
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
    </section>
  );
}
