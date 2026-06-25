import type { Publication } from "@/data/publication";

export const azegami2026miru: Publication = {
  slug: "azegami2026miru",
  title: "DA-LoRA: 植物病害診断におけるドメイン特徴の視覚的分析のための敵対的画像生成",
  authors: [
    { name: "Tatsuki Azegami" },
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
    "Domain Shift",
    "Image Generation",
    "Plant Disease Diagnosis",
  ],
  abstract:
    "植物病害の画像診断において, 撮影環境などのドメイン変化に十分な精度が得られないドメインシフトが問題となっている. しかし, 敵対的学習などによるドメイン依存特徴の除去は, 必ずしも精度向上に寄与しない. 本研究では, 画像生成モデルにドメインラベルを用いたドメインの分離を行うDA-LoRAを提案し, ドメイン依存, ドメイン中立特徴を画像として分離することで, それぞれの特徴が分類に与える影響を分析する.",
  relatedLinks: {
    Paper: "/publications/azegami2026miru/paper.pdf",
  },
};
