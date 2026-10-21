import { SectionSeeAllLink } from "@/components/home/section-see-all-link";

interface SectionListFooterProps {
  shownCount: number;
  totalCount: number;
  href: string;
}

export function SectionListFooter({
  shownCount,
  totalCount,
  href,
}: SectionListFooterProps) {
  if (shownCount >= totalCount) {
    return null;
  }

  return (
    <div className="pt-4">
      <div className="flex min-w-0 items-start justify-between gap-3 sm:items-center">
        <p className="min-w-0 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
          Latest {shownCount} of {totalCount}
        </p>
        <SectionSeeAllLink href={href} />
      </div>
    </div>
  );
}
