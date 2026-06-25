export interface NewsItem {
  date: string;
  title: string;
  href: string;
}

function getSortValue(date: string) {
  const normalizedDate = Number(date.replaceAll("-", ""));

  return Number.isNaN(normalizedDate) ? 0 : normalizedDate;
}

export const newsItems: NewsItem[] = [
  {
    date: "2024-09-05",
    title: "🗣️ We presented a paper at YANS 2024!",
    href: "/publications?venue=YANS%202024",
  },
  {
    date: "2024-11-16",
    title: "🎤 I gave a talk at the Computer Vision Paper Reading!",
    href: "/publications/kawada2024kantocv",
  },
  {
    date: "2025-03-10",
    title: "🗣️ We presented a paper at NLP 2025!",
    href: "/publications?venue=NLP%202025",
  },
  {
    date: "2025-07-29",
    title: "🗣️ We presented a paper at MIRU 2025!",
    href: "/publications?venue=MIRU%202025",
  },
  {
    date: "2025-09-18",
    title: "🗣️ We presented 3 papers at YANS 2025!",
    href: "/publications?venue=YANS%202025",
  },
  {
    date: "2026-03-04",
    title: "🗣️ We presented a paper at DEIM 2026!",
    href: "/publications?venue=DEIM%202026",
  },
  {
    date: "2026-03-09",
    title: "🗣️ We presented 2 papers at NLP 2026!",
    href: "/publications?venue=NLP%202026",
  },
  {
    date: "2026-04-21",
    title: "🎤 I gave a talk at the NLP 2026 Report Meetup!",
    href: "/publications/kawada2026ai4science",
  },
  {
    date: "2026-06-03",
    title: "🎉 Our paper has been accepted to CVPRF 2026!",
    href: "/publications?venue=CVPRF%202026",
  },
  {
    date: "2026-07-02",
    title: "🎉 Our paper has been accepted to ACL SRW 2026!",
    href: "/publications?venue=ACL%20SRW%202026",
  },
  {
    date: "2026-08-03",
    title: "🗣️ We presented 3 papers at MIRU 2026!",
    href: "/publications?venue=MIRU%202026",
  },
  {
    date: "2026-08-09",
    title: "🎉 Our paper has been accepted to MIPR 2026!",
    href: "/publications?venue=MIPR%202026",
  },
].sort((left, right) => getSortValue(right.date) - getSortValue(left.date));
