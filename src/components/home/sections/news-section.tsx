import { NewsEntry } from "@/components/news/news-entry";
import { SectionListFooter } from "@/components/home/section-list-footer";
import { SectionHeading } from "@/components/home/section-heading";
import { newsItems } from "@/data/news";

export function NewsSection() {
  if (newsItems.length === 0) {
    return null;
  }

  const featuredNewsItems = newsItems.slice(0, 5);

  return (
    <section id="news" className="min-w-0 max-w-full">
      <SectionHeading eyebrow="Highlights" title="News" />
      <div className="min-w-0 max-w-full divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {featuredNewsItems.map((item) => (
          <NewsEntry key={`${item.date}-${item.title}`} item={item} />
        ))}
      </div>
      <SectionListFooter
        shownCount={featuredNewsItems.length}
        totalCount={newsItems.length}
        href={"/news"}
      />
    </section>
  );
}
