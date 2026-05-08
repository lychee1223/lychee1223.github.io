import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { AwardBadge } from "@/components/publications/award-badge";
import {
  formatPublicationDate,
  getPublicationVenueLabel,
  getPublicationVenuePrefix,
  getPublicationBySlug,
  publicationData,
} from "@/data/publication";
import { getPublicationContentBySlug } from "@/data/publication-content";
import {
  getAuthorNotes,
  renderAuthors,
} from "@/components/publications/render-authors";
import { Markdown } from "@/components/publications/markdown";

interface PublicationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return publicationData.map((publication) => ({
    slug: publication.slug,
  }));
}

export async function generateMetadata({ params }: PublicationPageProps) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  return {
    title: publication ? publication.title : "Publication",
  };
}

export default async function PublicationPage({
  params,
}: PublicationPageProps) {
  const { slug } = await params;
  const publication = getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  const relatedLinks = publication.resources ?? [];
  const publicationContent = getPublicationContentBySlug(publication.slug);
  const venueLabel = getPublicationVenueLabel(publication);
  const venuePrefix = getPublicationVenuePrefix(publication);
  const authorNotes = publication.authors
    ? getAuthorNotes(publication.authors)
    : [];

  return (
    <div className="min-h-screen bg-transparent">
      <main className="mx-auto max-w-screen-lg px-5 pb-20 pt-6 max-[500px]:pt-6 sm:px-8 sm:pt-8">
        <article>
          <h1 className="mb-6 break-words font-serif text-3xl font-bold leading-snug text-zinc-900">
            {publication.title}
          </h1>

          <div className="space-y-3 mb-10">
            {publication.authors && (
              <div>
                <p className="break-words text-sm leading-relaxed text-zinc-700">
                  {renderAuthors(publication.authors, { linked: true })}
                </p>
                {authorNotes.length > 0 && (
                  <p className="mt-1 text-xs text-zinc-500">
                    {authorNotes.join("; ")}
                  </p>
                )}
              </div>
            )}
            {venueLabel && (
              <p className="text-sm text-zinc-700">
                <span className="text-zinc-500">{venuePrefix}</span>{" "}
                {publication.venueURL ? (
                  <a
                    href={publication.venueURL}
                    className="hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {venueLabel}
                  </a>
                ) : (
                  venueLabel
                )}
              </p>
            )}
            {publication.date && (
              <p className="text-sm text-zinc-700">
                <span className="text-zinc-500">Presented:</span>{" "}
                {formatPublicationDate(publication.date)}
              </p>
            )}
            {publication.keywords && publication.keywords.length > 0 && (
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-2">
                <span className="whitespace-nowrap text-sm text-zinc-500">
                  Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {publication.keywords.map((keyword) => (
                    <Link
                      key={keyword}
                      href={`/publications?keyword=${encodeURIComponent(keyword)}`}
                      className="rounded-full border border-blue-200 bg-blue-50/90 px-2.5 py-1 text-xs font-medium text-blue-800 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-950"
                    >
                      {keyword}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {publication.awards && publication.awards.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {publication.awards.map((award) => (
                  <AwardBadge key={award} award={award} />
                ))}
              </div>
            )}
          </div>

          {publication.abstract && (
            <section className="mb-10">
              <h2 className="font-serif text-base font-bold mb-4 tracking-wide uppercase">
                Abstract
              </h2>
              <p className="paper-copy text-sm text-zinc-700 leading-relaxed">
                {publication.abstract}
              </p>
            </section>
          )}

          {relatedLinks.length > 0 && (
            <section className="mb-12">
              <div className="flex flex-wrap gap-3">
                {relatedLinks.map((resource) => (
                  <a
                    key={`${resource.label}-${resource.url}`}
                    href={resource.url}
                    className="group inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3 py-1.5 text-xs font-medium text-blue-800 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-950"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight
                      size={12}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                    />
                    <span className="tracking-wider">{resource.label}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {publicationContent && (
            <section className="publication-mdx">
              <Markdown source={publicationContent} />
            </section>
          )}
        </article>
      </main>
    </div>
  );
}
