import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { newsItems } from "@/data/news";

const newsMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatNewsDate(date?: string) {
  if (!date) {
    return null;
  }

  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return date;
  }

  const [, year, month] = match;
  const monthIndex = Number(month) - 1;

  if (monthIndex < 0 || monthIndex >= newsMonthNames.length) {
    return date;
  }

  return `${newsMonthNames[monthIndex]} ${year}`;
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <main className="mx-auto max-w-screen-md px-5 py-20 sm:px-8">
        <section>
          <h1 className="mb-3 font-serif text-3xl font-bold leading-snug text-zinc-900">
            News
          </h1>
          <p className="mb-12 text-sm text-zinc-700">
            Recent talks, conference updates, and publication news.
          </p>
          <div className="min-w-0 max-w-full divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {newsItems.map((item) => {
              const content = (
                <>
                  <time className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
                    {formatNewsDate(item.date)}
                  </time>
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-start justify-between gap-3">
                      <h2 className="min-w-0 break-words font-serif text-base font-semibold leading-snug text-slate-950 transition-colors duration-300 group-hover:text-[color:var(--accent-strong)] sm:text-lg">
                        {item.title}
                      </h2>
                      <ArrowRight
                        size={15}
                        className="mt-1 shrink-0 text-[color:var(--accent-strong)] transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </>
              );

              return isExternalHref(item.href) ? (
                <a
                  key={`${item.date}-${item.href}`}
                  href={item.href}
                  className="group grid min-w-0 grid-cols-1 gap-3 py-5 transition-colors duration-300 hover:bg-[color:var(--surface-muted)] max-[500px]:py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5 sm:px-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <Link
                  key={`${item.date}-${item.href}`}
                  href={item.href}
                  className="group grid min-w-0 grid-cols-1 gap-3 py-5 transition-colors duration-300 hover:bg-[color:var(--surface-muted)] max-[500px]:py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5 sm:px-3"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
