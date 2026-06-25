import type { Publication } from "@/data/publication";

export const nakagawa2026miru: Publication = {
  slug: "nakagawa2026miru",
  title: "密集圃場群における超解像衛星画像特徴と空間補正を用いた病害率推定の初期検討",
  authors: [
    { name: "Yuki Nakagawa" },
    { name: "Takuro Kawada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-08-03",
  category: "domestic-conference",
  venueFull: "第29回 画像の認識・理解シンポジウム",
  venueShort: "MIRU 2026",
  venueURL: "https://miru-committee.github.io/miru2026/",
  keywords: [
    "Computer Vision",
    "Remote Sensing",
    "Graph Neural Networks",
    "Plant Disease Diagnosis",
  ],
  abstract:
    "本研究では, 小規模圃場が多数密集する地域を対象に, 超解像処理した低解像度衛星画像と圃場間の地理的関係を用いる GNN を統合した病害率推定手法を検討した. 群馬県・松義台地約 9 ㎢ にある 321 のコンニャク圃場で評価した結果, 超解像処理により画像単体モデルの性能が改善し, GNN 補正によってさらに向上した. 両者を統合した提案手法は最も高い性能を示し, 低コストな病害診断の実現可能性を示した.",
  relatedLinks: {
    Paper: "/publications/nakagawa2026miru/paper.pdf",
  },
};
