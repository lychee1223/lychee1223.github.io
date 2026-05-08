import Link from "next/link";
import { Globe } from "lucide-react";
import type { PublicationAuthor } from "@/data/publication";
import { authorHomepages, ownAuthorName } from "../../data/authors";

interface RenderAuthorsOptions {
  linked?: boolean;
}

const authorAnnotations = {
  equalContribution: {
    symbol: "*",
    label: "Equal Contribution",
  },
} as const;

export function getAuthors(authors: PublicationAuthor[]) {
  return authors.map((author) => author.name);
}

export function getAuthorNotes(authors: PublicationAuthor[]) {
  const notes: string[] = [];

  if (authors.some((author) => author.equalContribution)) {
    notes.push(
      `${authorAnnotations.equalContribution.symbol} ${authorAnnotations.equalContribution.label}`,
    );
  }

  return notes;
}

export function renderAuthors(
  authors: PublicationAuthor[],
  options: RenderAuthorsOptions = {},
) {
  return authors.map((author, index, authorList) => {
    const homepageUrl = authorHomepages[author.name];
    const className =
      author.name === ownAuthorName
        ? options.linked
          ? "font-semibold text-slate-900"
          : "font-semibold text-slate-900 underline underline-offset-2"
        : undefined;
    const hasSuffix = index < authorList.length - 1;
    const wrapperClassName = `inline-flex items-baseline whitespace-nowrap ${
      hasSuffix ? "mr-[0.33em]" : ""
    }`.trim();
    const suffix = author.equalContribution
      ? authorAnnotations.equalContribution.symbol
      : "";

    if (options.linked) {
      return (
        <span key={`${author.name}-${index}`} className={wrapperClassName}>
          <Link
            href={`/publications?author=${encodeURIComponent(author.name)}`}
            className={`${className ?? ""} hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2 transition-colors duration-300`}
          >
            {author.name}
          </Link>
          {suffix ? (
            <sup className="ml-0.5 text-[0.72em] leading-none text-slate-500">
              {suffix}
            </sup>
          ) : null}
          {homepageUrl ? (
            <a
              href={homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} website`}
              className="ml-1 inline-flex h-[1.05em] w-[1.05em] items-center justify-center rounded-full border border-slate-300 bg-white/90 align-baseline text-slate-500 transition-colors duration-300 hover:border-[color:var(--accent-strong)] hover:bg-blue-50 hover:text-[color:var(--accent-strong)]"
            >
              <Globe size={10} aria-hidden="true" />
            </a>
          ) : null}
          {hasSuffix && <span>,</span>}
        </span>
      );
    }

    return (
      <span
        key={`${author.name}-${index}`}
        className={`${wrapperClassName} ${className ?? ""}`.trim()}
      >
        {author.name}
        {suffix ? (
          <sup className="ml-0.5 text-[0.72em] leading-none text-slate-500">
            {suffix}
          </sup>
        ) : null}
        {hasSuffix && <span>,</span>}
      </span>
    );
  });
}
