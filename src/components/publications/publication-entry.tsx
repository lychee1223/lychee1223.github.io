import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublicationListVenueLabel, Publication } from "@/data/publication";
import { AwardBadge } from "@/components/publications/award-badge";
import {
  getAuthorNotes,
  renderAuthors,
} from "@/components/publications/render-authors";

export function PublicationEntry({
  publication,
}: {
  publication: Publication;
}) {
  const metaLabel = getPublicationListVenueLabel(publication);
  const awards = publication.awards ?? [];
  const authorNotes = publication.authors
    ? getAuthorNotes(publication.authors)
    : [];

  return (
    <Link
      href={`/publications/${publication.slug}`}
      className="group flex min-w-0 max-w-full flex-col gap-4 rounded-lg py-1.5 transition-colors duration-300 hover:bg-[color:var(--surface-muted)] max-[500px]:gap-3 sm:flex-row sm:px-3"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <p className="max-w-full break-words text-sm font-medium uppercase tracking-[0.18em] text-[color:var(--accent-strong)] max-[500px]:text-xs max-[500px]:tracking-[0.12em]">
            {metaLabel}
          </p>
          {awards.length > 0 && (
            <div className="hidden flex-wrap gap-2 sm:flex">
              {awards.map((award) => (
                <AwardBadge key={award} award={award} />
              ))}
            </div>
          )}
        </div>
        <div className="mb-2 flex min-w-0 items-start justify-between gap-4">
          <h3 className="min-w-0 flex-1 break-words font-serif text-base font-semibold leading-snug sm:text-lg">
            <span className="text-slate-950 transition-colors duration-300 group-hover:text-[color:var(--accent-strong)]">
              {publication.title}
            </span>
          </h3>
          <ArrowRight
            size={15}
            className="mt-1 shrink-0 text-[color:var(--accent-strong)] transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
        {publication.authors && (
          <div className="mb-3 min-w-0">
            <p className="min-w-0 break-words text-base text-slate-700 max-[500px]:text-sm">
              {renderAuthors(publication.authors)}
            </p>
            {authorNotes.length > 0 && (
              <p className="mt-1 text-xs text-slate-500">
                {authorNotes.join("; ")}
              </p>
            )}
          </div>
        )}
        {awards.length > 0 && (
          <div className="mb-3 flex min-w-0 max-w-full flex-wrap gap-2 sm:hidden">
            {awards.map((award) => (
              <AwardBadge key={award} award={award} />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
