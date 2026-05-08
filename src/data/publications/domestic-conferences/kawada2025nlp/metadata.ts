import type { Publication } from "@/data/publication";

export const kawada2025nlp: Publication = {
  slug: "kawada2025nlp",
  title:
    "SciGA: 学術論文における Graphical Abstract 設計支援のための統合データセット",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Sota Nemoto" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2025-03-10",
  category: "domestic-conference",
  venueFull: "言語処理学会第31回年次大会",
  venueShort: "NLP 2025",
  venueURL: "https://www.anlp.jp/proceedings/annual_meeting/2025/",
  keywords: [
    "Natural Language Processing",
    "Computer Vision",
    "Vision & Language",
    "Dataset",
    "Image Retrieval",
    "AI for Science",
  ],
  abstract:
    "Graphical Abstract (GA) は論文の要点を視覚的に伝える重要な表現手段である. 効果的なGAの作成には高度なデザインスキルが求められ, 作成支援技術の実現が期待される. 本研究では, 約14.5万の論文とGAを含む141万枚の図からなるデータセットSciGA-140kを構築した. また, GA作成支援の前段として, Abstractを基に論文内の図から最適なGA構成要素を検索するタスクAbst2GA Retrievalを提案する. 我々はCLIPを基盤とするベースラインを設計し, 提案タスクの有効性を示した. 本モデルは他論文のGAを検索し, デザイン案を提示する支援機能も提供する. 我々のアプローチはGA作成支援の新たな方向性を示し, AI for Scienceの発展に貢献する.",
  resources: [
    {
      label: "Paper",
      url: "https://www.anlp.jp/proceedings/annual_meeting/2025/pdf_dir/Q1-21.pdf",
    },
    {
      label: "Poster",
      url: "/publications/kawada2025nlp/poster.pdf",
    },
  ],
};
