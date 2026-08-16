import type { Publication } from "@/data/publication";

export const sutoh2026yans: Publication = {
  slug: "sutoh2026yans",
  title:
    "視覚言語モデルと病徴属性を用いた植物病害診断手法の検討",
  authors: [
    { name: "Mizuki Sutoh" },
    { name: "Tatsuki Azegami" },
    { name: "Takuro Kawada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-08-16",
  category: "domestic-conference",
  venueFull: "第21回言語処理若手シンポジウム",
  venueShort: "YANS 2026",
  venueURL: "https://yans.anlp.jp/entry/yans2026",
  keywords: [
    "Computer Vision",
    "Natural Language Processing",
    "Vision & Language",
    "Plant Disease Diagnosis",
  ],
  abstract:
    "植物病害診断において, 同じ病害であっても病徴に圃場固有の差が生じる. そのため, 診断モデルを構築する際に, 病徴の多様性に対して収集可能な画像の多様性が不足し, 本質的な診断性能を確保することが困難となる課題が残されている. 一方, 専門家による診断の知見は, 幅広い症例の観察を通じて蓄積され, 視覚的に把握しやすい特徴に基づいている. しかし, これらの知見の多くはテキスト形式であり, 単純な画像診断に組み込むことは困難である. 本研究では, 視覚言語モデルにより専門家の知見を活用した植物病害診断手法を検討する. 提案手法は, 視覚言語モデルを用いて診断知見を構成する病徴属性を抽出し, 既存の画像診断モデルと統合することで, 圃場差に頑健な識別を目指す.",
  relatedLinks: {
    Poster: "/publications/domestic-conferences/sutoh2026yans/poster.pdf",
  },
};
