import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <div className="flex min-w-0 max-w-full flex-col gap-6 max-[500px]:gap-4 sm:flex-row">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-2 flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
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
        <h3 className="mb-3 min-w-0 break-words font-serif text-lg font-semibold max-[500px]:text-[1rem] sm:text-xl">
          <Link
            href={`/publications/${publication.slug}`}
            className="text-slate-950 transition-colors duration-300 hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
          >
            {publication.title}
          </Link>
        </h3>
        {publication.authors && (
          <div className="mb-4 min-w-0">
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
          <div className="mb-4 flex min-w-0 max-w-full flex-wrap gap-2 sm:hidden">
            {awards.map((award) => (
              <AwardBadge key={award} award={award} />
            ))}
          </div>
        )}
        <div className="flex flex-row gap-6 max-[500px]:gap-4">
          <Link
            href={`/publications/${publication.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-slate-600 transition-colors duration-300 hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
          >
            <ArrowUpRight
              size={12}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
            <span className="tracking-wider uppercase">Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
