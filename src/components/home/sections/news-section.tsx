import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { newsItems, type NewsItem } from "@/data/news";
import { formatYearMonthDate } from "@/utils/date";

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function NewsItemLink({
  item,
  children,
}: {
  item: NewsItem;
  children: ReactNode;
}) {
  if (isExternalHref(item.href)) {
    return (
      <a
        href={item.href}
        className="group grid min-w-0 grid-cols-1 items-center gap-3 py-5 transition-colors duration-300 hover:bg-[color:var(--surface-muted)] max-[500px]:py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5 sm:px-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className="group grid min-w-0 grid-cols-1 items-center gap-3 py-5 transition-colors duration-300 hover:bg-[color:var(--surface-muted)] max-[500px]:py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5 sm:px-3"
    >
      {children}
    </Link>
  );
}

export function NewsSection() {
  if (newsItems.length === 0) {
    return null;
  }

  const featuredNewsItems = newsItems.slice(0, 5);
  const hasMoreNewsItems = newsItems.length > featuredNewsItems.length;

  return (
    <section id="news" className="min-w-0 max-w-full">
      <SectionHeading eyebrow="Highlights" title="News" />
      <div className="min-w-0 max-w-full divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {featuredNewsItems.map((item) => {
          return (
            <NewsItemLink key={`${item.date}-${item.href}`} item={item}>
              <time className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
                {formatYearMonthDate(item.date)}
              </time>
              <div className="min-w-0">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <h3 className="min-w-0 break-words font-serif text-base font-semibold leading-snug text-slate-950 transition-colors duration-300 group-hover:text-[color:var(--accent-strong)] sm:text-lg">
                    {item.title}
                  </h3>
                  <ArrowRight
                    size={15}
                    className="mt-1 shrink-0 text-[color:var(--accent-strong)] transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </NewsItemLink>
          );
        })}
      </div>
      {hasMoreNewsItems && (
        <div className="pt-4">
          <div className="flex min-w-0 items-start justify-between gap-3 sm:items-center">
            <p className="min-w-0 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
              Latest {featuredNewsItems.length} of {newsItems.length}
            </p>
            <Link
              href="/news"
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
