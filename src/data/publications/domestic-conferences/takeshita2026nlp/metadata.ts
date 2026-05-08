import type { Publication } from "@/data/publication";

export const takeshita2026nlp: Publication = {
  slug: "takeshita2026nlp",
  title:
    "Compressed-a11y: 視覚的文脈の再構成と冗長性削減による GUI エージェント観測の効率化",
  authors: [
    { name: "Michito Takeshita" },
    { name: "Takuro Kawada" },
    { name: "Takumi Ohashi" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-03-09",
  category: "domestic-conference",
  venueFull: "言語処理学会第32回年次大会",
  venueShort: "NLP 2026",
  venueURL: "https://www.anlp.jp/proceedings/annual_meeting/2026/",
  keywords: ["Natural Language Processing", "Vision & Language", "AI Agents"],
  abstract:
    "ローカル環境での GUI エージェント実用化には, 限られた計算資源下での効率的な画面観測が重要である. Accessibility tree に基づく画面構造の観測は, 大規模言語モデル (Large Language Models; LLM) による操作対象の特定に有効な一方, 情報の冗長性や視覚的文脈の欠如, 状況理解の正確性の限界が課題である. 本研究では, LLM が効率的に画面構造を理解可能な観測表現として, ノード削減と空間配置の再構成により情報を圧縮した Compressed-a11y を提案する. 評価実験の結果, Compressed-a11y は入力トークン数を最大90% 削減し, 多くのタスクで高い成功率を達成した. 本研究は, ローカル環境における効率的な GUI 観測手法の実現に貢献する.",
  resources: [
    {
      label: "Paper",
      url: "https://www.anlp.jp/proceedings/annual_meeting/2026/pdf_dir/C5-2.pdf",
    },
    {
      label: "Poster",
      url: "/publications/takeshita2026nlp/poster.pdf",
    },
  ],
};
