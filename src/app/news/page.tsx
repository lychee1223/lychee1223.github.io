import { NewsDetailLink } from "@/components/news/news-detail-link";
import { newsItems } from "@/data/news";
import { formatYearMonthDate } from "@/utils/date";

function renderNewsTitle(title: string) {
  const [emoji, ...rest] = title.split(" ");

  if (rest.length === 0) {
    return title;
  }

  return (
    <span className="inline-flex min-w-0 items-baseline">
      <span className="w-7 shrink-0">{emoji}</span>
      <span className="min-w-0">{rest.join(" ")}</span>
    </span>
  );
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
            {newsItems.map((item) => (
              <article
                key={`${item.date}-${item.title}`}
                className="grid min-w-0 grid-cols-1 items-center gap-3 py-5 max-[500px]:py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5 sm:px-3"
              >
                <time className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
                  {formatYearMonthDate(item.date)}
                </time>
                <div className="min-w-0">
                  <h2 className="min-w-0 break-words font-serif text-base font-semibold leading-snug text-slate-950 sm:text-lg">
                    {renderNewsTitle(item.title)}
                  </h2>
                  {item.items.length > 0 && (
                    <ul className="ml-8 mt-2 space-y-1 text-[0.82rem] leading-relaxed text-slate-600 max-[500px]:text-[0.78rem]">
                      {item.items.map((detail) => (
                        <li
                          key={`${detail.title}-${detail.href}`}
                          className="flex min-w-0 items-start gap-2"
                        >
                          <span
                            className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-current"
                            aria-hidden="true"
                          />
                          <NewsDetailLink
                            href={detail.href}
                            title={detail.title}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
