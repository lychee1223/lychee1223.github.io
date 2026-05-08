import type { Publication } from "@/data/publication";

export const kawada2026deim: Publication = {
  slug: "kawada2026deim",
  title: "動画に基づく教本参照型コーチングエージェントの構築",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Masaya Fujiwaka" },
    { name: "Ji Xiaotong" },
    { name: "Jianquan Liu" },
  ],
  date: "2026-03-04",
  category: "domestic-conference",
  venueFull: "第24回日本データベース学会年次大会",
  venueShort: "DEIM 2026",
  venueURL: "https://pub.confit.atlas.jp/ja/event/deim2026",
  keywords: [
    "Natural Language Processing",
    "Computer Vision",
    "Vision & Language",
    "AI Agents",
    "Video Understanding",
  ],
  awards: ["Student Presentation Award"],
  abstract:
    "コーチングとは, 観測された行動を参照基準と比較し, その差分に基づいて改善を促す教育的支援である. 動画に基づくコーチングの既存研究の多くは, 学習者の動画に対してお手本動画を参照基準としてきたが, 高品質なお手本動画を大規模に用意することは困難である. 本研究では, 教本などのドキュメントを参照基準とし, 学習者の行動が, いつ・どの規範から・どの程度, 基準から逸脱したかを推定するコーチングエージェントを提案する. 提案手法では, ドキュメントをルーブリックとして構造化し, 動画中の行動と整列させることで, 各時刻の逸脱度を定量化する. これにより, 参照動画や追加学習を必要としない解釈可能なコーチング支援を実現する.",
  resources: [
    {
      label: "Paper",
      url: "/publications/kawada2026deim/paper.pdf",
    },
    {
      label: "Slides",
      url: "/publications/kawada2026deim/slides.pdf",
    },
    {
      label: "Poster",
      url: "/publications/kawada2026deim/poster.pdf",
    },
  ],
};
