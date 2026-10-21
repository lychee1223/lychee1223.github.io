import { NewsEntry } from "@/components/news/news-entry";
import { newsItems } from "@/data/news";

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
              <NewsEntry
                key={`${item.date}-${item.title}`}
                item={item}
                headingLevel={2}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
