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
    title: "I received the Academic Excellence Award from Hosei University.",
    date: "2023-07-07",
    description:
      "2023年度 理工系学部教育・研究振興基金 学業優秀賞を受賞しました. 本賞は学部3年次での成績最上位者に授与されるものです.",
    receivedItems: ["50,000 JPY"],
    relatedLinks: {
      Certificate: "/certificate/2023-hosei-academic-excellence-award.pdf",
    },
  },
  {
    title:
      "I was selected for Hosei University's Highest Academic Achievement Scholarship.",
    date: "2024-06-22",
    description:
      "2024年度 成績最優秀者奨学生に選出されました. 本奨学金は学部4年次での成績上位者に給付されるものです.",
    receivedItems: ["300,000 JPY"],
    relatedLinks: {
      Certificate:
        "/certificate/2024-hosei-highest-academic-achievement-scholarship.pdf",
    },
  },
  {
    title:
      "I received the Hosei University Science and Engineering Alumni Association Award.",
    date: "2025-03-24",
    description:
      "2024年度 法政大学理系同窓会褒賞を受賞しました. 本賞は首席で卒業した学生に授与されるものです.",
    receivedItems: ["Commemorative Pen"],
    relatedLinks: {
      Certificate:
        "/certificate/2025-hosei-science-engineering-alumni-association-award.pdf",
    },
  },
  {
    title: "I received the Best Graduation Thesis Award from Hosei University.",
    date: "2025-03-24",
    description: "2024年度 卒業論文審査会最優秀賞を受賞しました.",
    relatedLinks: {
      Certificate: "/certificate/2025-hosei-best-graduation-thesis-award.pdf",
    },
  },
  {
    title:
      "I received the Educational Contribution Award from Hosei University.",
    date: "2025-03-24",
    description:
      "2024年度 教育貢献賞を受賞しました. 本賞はラーニング・サポーターとしての活動に対して授与されたものです.",
    relatedLinks: {
      Certificate: "/certificate/2025-hosei-educational-contribution-award.pdf",
    },
  },
  {
    title: "I received the Hosei University Student Association Award.",
    date: "2025-03-24",
    description:
      "2025年度 学友会表彰者に選出されました. 本表彰は技術系サークル計算技術研究会における副会長としての活動に対して授与されたものです.",
    receivedItems: ["Book Gift Card (500 JPY)"],
    relatedLinks: {
      Certificate: "/certificate/2025-hosei-student-association-award.pdf",
    },
  },
  {
    title:
      "I received the Jury Special Award in the SFT Track at the YANS 2025 Hackathon.",
    date: "2025-09-17",
    description:
      "YANS 2025 の分野交流ハッカソンにて, SFT 部門・審査員特別賞を受賞しました.",
    relatedLinks: {
      Certificate: "/certificate/2025-yans-hackathon-jury-special-award.pdf",
      Article: "https://www.hosei.ac.jp/info/article-20250924091423/",
    },
  },
  {
    title: "I received the ABEJA Sponsor Award at YANS 2025.",
    date: "2025-09-19",
    description: "YANS 2025 にて, ABEJA 賞を受賞しました.",
    receivedItems: ["Anker Power Bank", "ABEJA Original T-shirt"],
    relatedLinks: {
      Certificate: "/certificate/2025-yans-sponsor-award.pdf",
      Article: "https://www.hosei.ac.jp/info/article-20250924091423/",
      Publication: "/publications/kawada2025yans",
    },
  },
  {
    title: "I received the Student Presentation Award at DEIM 2026.",
    date: "2026-03-05",
    description: "DEIM 2026 にて, 学生プレゼンテーション賞を受賞しました.",
    relatedLinks: {
      Certificate: "/certificate/2026-deim-student-presentation-award.pdf",
      Publication: "/publications/kawada2026deim",
    },
  },
  {
    title: "I received the Academic Excellence Award from Hosei University.",
    date: "2026-06-05",
    description:
      "2026年度 理工系学部教育・研究振興基金 学業優秀賞を受賞しました. 本賞は修士課程2年次での成績最上位者に授与されるものです.",
    receivedItems: ["50,000 JPY"],
    relatedLinks: {
      Certificate: "/certificate/2026-hosei-academic-excellence-award.pdf",
    },
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
