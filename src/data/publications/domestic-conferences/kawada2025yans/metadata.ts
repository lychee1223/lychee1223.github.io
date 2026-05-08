import type { Publication } from "@/data/publication";

export const kawada2025yans: Publication = {
  slug: "kawada2025yans",
  title:
    "GenGA: 学術論文における編集可能な Graphical Abstract の自動生成に関する初期検討",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2025-09-18",
  category: "domestic-conference",
  venueFull: "第20回言語処理若手シンポジウム",
  venueShort: "YANS 2025",
  venueURL: "https://yans.anlp.jp/entry/yans2025",
  keywords: [
    "Natural Language Processing",
    "Computer Vision",
    "Vision & Language",
    "Image Generation",
    "AI for Science",
  ],
  awards: ["ABEJA Sponsor Award", "Jury Special Award, Hackathon"],
  abstract:
    "Graphical Abstract (GA) は論文の要点を視覚的に伝える重要な表現手段である. 効果的な GA の作成には高度なデザインスキルが求められ, 設計支援技術の実現が期待される. 本研究では, 後から手動編集可能な GA を自動生成するフレームワーク GenGA を提案する. GenGA は, 対象論文の本文を Vision-Language Model (VLM) に入力し, ベクタ画像コード (SVG) として GA を生成する. 生成コードをレンダリングした後, 別の VLM が本文との整合性や可読性を評価し, その結果を生成器に反映して出力を反復的に改良する. GenGA は, 迅速に修正・再利用可能な GA を提供し, 作成コストの低減を通じて科学コミュニケーションの円滑化に貢献する.",
  resources: [
    {
      label: "Poster",
      url: "/publications/kawada2025yans/poster.pdf",
    },
  ],
};
