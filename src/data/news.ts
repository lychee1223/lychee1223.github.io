export interface NewsDetail {
  title: string;
  href: string;
}

export interface NewsItem {
  date: string;
  title: string;
  items: NewsDetail[];
}

function getSortValue(date: string) {
  const normalizedDate = Number(date.replaceAll("-", ""));

  return Number.isNaN(normalizedDate) ? 0 : normalizedDate;
}

export const newsItems: NewsItem[] = [
  {
    date: "2024-09-05",
    title: "🗣️ We presented a paper at YANS 2024!",
    items: [
      {
        title: "学術論文における Graphical Abstract 自動生成の初期検討",
        href: "/publications/kawada2024yans",
      },
    ],
  },
  {
    date: "2024-11-16",
    title: "🎤 I gave a talk at the Computer Vision Paper Reading!",
    items: [
      {
        title: "Long-CLIP: Unlocking the Long-Text Capability of CLIP",
        href: "/publications/kawada2024kantocv",
      },
    ],
  },
  {
    date: "2025-03-10",
    title: "🗣️ We presented a paper at NLP 2025!",
    items: [
      {
        title:
          "SciGA: 学術論文における Graphical Abstract 設計支援のための統合データセット",
        href: "/publications/kawada2025nlp",
      },
    ],
  },
  {
    date: "2025-07-29",
    title: "🗣️ We presented a paper at MIRU 2025!",
    items: [
      {
        title: "グラフィカルアブストラクト推薦と評価の統合ベンチマーク",
        href: "/publications/kawada2025miru",
      },
    ],
  },
  {
    date: "2025-09-18",
    title: "🗣️ We presented 3 papers at YANS 2025!",
    items: [
      {
        title:
          "GenGA: 学術論文における編集可能な Graphical Abstract の自動生成に関する初期検討",
        href: "/publications/kawada2025yans",
      },
      {
        title: "WRIME-TC: 時間的文脈による書き手と読み手の感情分析の強化",
        href: "/publications/chan2025yans",
      },
      {
        title: "ローカル LLM を用いた AI エージェントの現状と課題",
        href: "/publications/takeshita2025yans",
      },
    ],
  },
  {
    date: "2026-03-04",
    title: "🗣️ We presented a paper at DEIM 2026!",
    items: [
      {
        title: "動画に基づく教本参照型コーチングエージェントの構築",
        href: "/publications/kawada2026deim",
      },
    ],
  },
  {
    date: "2026-03-09",
    title: "🗣️ We presented 2 papers at NLP 2026!",
    items: [
      {
        title:
          "SciGA-Vec: 学術論文におけるベクタ画像形式の Graphical Abstract データセット",
        href: "/publications/kawada2026nlp",
      },
      {
        title:
          "Compressed-a11y: 視覚的文脈の再構成と冗長性削減による GUI エージェント観測の効率化",
        href: "/publications/takeshita2026nlp",
      },
    ],
  },
  {
    date: "2026-04-21",
    title: "🎤 I gave a talk at the NLP 2026 Report Meetup!",
    items: [
      {
        title: "AI for Science まとめ",
        href: "/publications/kawada2026ai4science",
      },
    ],
  },
  {
    date: "2026-06-03",
    title: "🎉 Our paper has been accepted to CVPRF 2026!",
    items: [
      {
        title:
          "SciGA: A Comprehensive Dataset for Designing Graphical Abstracts in Academic Papers",
        href: "/publications/kawada2026sciga",
      },
    ],
  },
  {
    date: "2026-07-02",
    title: "🎉 Our paper has been accepted to ACL SRW 2026!",
    items: [
      {
        title:
          "A11y-Compressor: A Framework for Enhancing the Efficiency of GUI Agent Observations through Visual Context Reconstruction and Redundancy Reduction",
        href: "/publications/takeshita2026a11y",
      },
    ],
  },
  {
    date: "2026-08-03",
    title: "🗣️ We presented 3 papers at MIRU 2026!",
    items: [
      {
        title:
          "Generation and Evaluation of Editable Graphical Abstracts for Academic Papers",
        href: "/publications/kawada2026miru",
      },
      {
        title:
          "DA-LoRA: 植物病害診断におけるドメイン特徴の視覚的分析のための敵対的画像生成",
        href: "/publications/azegami2026miru",
      },
      {
        title:
          "密集圃場群における超解像衛星画像特徴と空間補正を用いた病害率推定の初期検討",
        href: "/publications/nakagawa2026miru",
      },
    ],
  },
  {
    date: "2026-08-09",
    title: "🎉 Our paper has been accepted to MIPR 2026!",
    items: [
      {
        title: "Document-Grounded Coaching Agent for Video Skill Assessment",
        href: "/publications/kawada2026document",
      },
    ],
  },
].sort((left, right) => getSortValue(right.date) - getSortValue(left.date));
