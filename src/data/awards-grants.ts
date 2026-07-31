export const awardGrantRelatedLinkKeys = [
  "Publication",
  "Certificate",
  "Article",
] as const;

export type AwardGrantRelatedLinkKey =
  (typeof awardGrantRelatedLinkKeys)[number];

export const awardGrantRelatedLinkText: Record<
  AwardGrantRelatedLinkKey,
  string
> = {
  Certificate: "Certificate",
  Article: "Article",
  Publication: "Publication",
};

export type AwardGrantRelatedLinks = Partial<
  Record<AwardGrantRelatedLinkKey, string>
>;

export interface AwardGrantRelatedLink {
  key: AwardGrantRelatedLinkKey;
  label: string;
  url: string;
}

export interface AwardGrantItem {
  title: string;
  date: string;
  description?: string;
  receivedItems?: string[];
  relatedLinks?: AwardGrantRelatedLinks;
}

const awardGrantItems: AwardGrantItem[] = [
  {
    title: "Hosei University Academic Excellence Award",
    date: "2023-07-07",
    description:
      "I received the 2023 Academic Excellence Award from the Faculty of Science and Engineering Education and Research Promotion Fund at Hosei University. This award is presented to the student with the highest academic performance within their department in the third undergraduate year.",
    receivedItems: ["50,000 JPY"],
    relatedLinks: {
      Certificate: "/certificate/2023-hosei-academic-excellence-award.pdf",
    },
  },
  {
    title: "Hosei University Highest Academic Achievement Scholarship",
    date: "2024-06-22",
    description:
      "I was selected for Hosei University's 2024 Highest Academic Achievement Scholarship. This scholarship is awarded to students with outstanding academic performance within their departments in the fourth undergraduate year.",
    receivedItems: ["300,000 JPY"],
    relatedLinks: {
      Certificate:
        "/certificate/2024-hosei-highest-academic-achievement-scholarship.pdf",
    },
  },
  {
    title: "Hosei University Science and Engineering Alumni Association Award",
    date: "2025-03-24",
    description:
      "I received the 2024 Hosei University Science and Engineering Alumni Association Award. This award is presented to the student who graduates at the top of their department.",
    receivedItems: ["Commemorative Pen"],
    relatedLinks: {
      Certificate:
        "/certificate/2025-hosei-science-engineering-alumni-association-award.pdf",
    },
  },
  {
    title: "Hosei University Best Graduation Thesis Award",
    date: "2025-03-24",
    description:
      "I received Hosei University's 2024 Best Graduation Thesis Award.",
    relatedLinks: {
      Certificate: "/certificate/2025-hosei-best-graduation-thesis-award.pdf",
    },
  },
  {
    title: "Hosei University Educational Contribution Award",
    date: "2025-03-24",
    description:
      "I received Hosei University's 2024 Educational Contribution Award for my work as a learning supporter.",
    relatedLinks: {
      Certificate: "/certificate/2025-hosei-educational-contribution-award.pdf",
    },
  },
  {
    title: "Hosei University Student Association Award",
    date: "2025-03-24",
    description:
      "I received Hosei University's 2025 Student Association Award for my activities as vice president of the Computing Technology Research Club.",
    receivedItems: ["Book Gift Card (500 JPY)"],
    relatedLinks: {
      Certificate: "/certificate/2025-hosei-student-association-award.pdf",
    },
  },
  {
    title: "Jury Special Award in the SFT Track at YANS 2025",
    date: "2025-09-17",
    description:
      "I received the Jury Special Award in the SFT Track at the YANS 2025 Interdisciplinary Hackathon.",
    relatedLinks: {
      Certificate: "/certificate/2025-yans-hackathon-jury-special-award.pdf",
      Article: "https://www.hosei.ac.jp/info/article-20250924091423/",
    },
  },
  {
    title: "ABEJA Sponsor Award at YANS 2025",
    date: "2025-09-19",
    description: "I received the ABEJA Sponsor Award at YANS 2025.",
    receivedItems: ["Anker Power Bank", "ABEJA Original T-shirt"],
    relatedLinks: {
      Certificate: "/certificate/2025-yans-sponsor-award.pdf",
      Article: "https://www.hosei.ac.jp/info/article-20250924091423/",
      Publication: "/publications/kawada2025yans",
    },
  },
  {
    title: "Student Presentation Award at DEIM 2026",
    date: "2026-03-05",
    description: "I received the Student Presentation Award at DEIM 2026.",
    relatedLinks: {
      Certificate: "/certificate/2026-deim-student-presentation-award.pdf",
      Publication: "/publications/kawada2026deim",
    },
  },
  {
    title: "Hosei University Academic Excellence Award",
    date: "2026-06-05",
    description:
      "I received the 2026 Academic Excellence Award from the Faculty of Science and Engineering Education and Research Promotion Fund at Hosei University. This award is presented to the student with the highest academic performance within their department in the second year of the master's program.",
    receivedItems: ["50,000 JPY"],
    relatedLinks: {
      Certificate: "/certificate/2026-hosei-academic-excellence-award.pdf",
    },
  },
  {
    title:
      "Hosei University 100th Anniversary Scholarship for Master's Program Students",
    date: "2026-07-30",
    description:
      "I was selected for the 2026 Hosei University 100th Anniversary Scholarship for Master's Program Students. This university-funded scholarship is awarded to master's students with outstanding academic performance.",
    receivedItems: ["200,000 JPY"],
  },
];

function getAwardGrantSortValue(item: AwardGrantItem) {
  const normalizedDate = Number(item.date.replaceAll("-", ""));

  return Number.isNaN(normalizedDate) ? 0 : normalizedDate;
}

export const awardsGrants = [...awardGrantItems].sort(
  (left, right) => getAwardGrantSortValue(right) - getAwardGrantSortValue(left),
);

export function getAwardGrantRelatedLinks(
  item: AwardGrantItem,
): AwardGrantRelatedLink[] {
  if (!item.relatedLinks) {
    return [];
  }

  return awardGrantRelatedLinkKeys.flatMap((key) => {
    const url = item.relatedLinks?.[key];

    return url ? [{ key, label: awardGrantRelatedLinkText[key], url }] : [];
  });
}
