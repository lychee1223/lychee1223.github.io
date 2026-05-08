import type { Publication } from "@/data/publication";

export const kawada2024yans: Publication = {
  slug: "kawada2024yans",
  title: "学術論文における Graphical Abstract 自動生成の初期検討",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Sota Nemoto" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2024-09-05",
  category: "domestic-conference",
  venueFull: "第19回言語処理若手シンポジウム",
  venueShort: "YANS 2024",
  venueURL: "https://yans.anlp.jp/entry/yans2024",
  keywords: [
    "Natural Language Processing",
    "Computer Vision",
    "Vision & Language",
    "Image Retrieval",
    "AI for Science",
  ],
  abstract:
    "Graphical Abstract (GA) とは, 論文の核心的な内容を伝えるために示す図であり, 近年採用する論文誌が増えてきた. そこで, より魅力的で効果的な GA を効率的に作成するための支援システムが求められている. 本研究では arXiv.org で入手可能な論文のテキスト, Figure, GA を含むデータセットを構築し, 機械学習モデルを用いた GA 自動生成の実現可能性を検討した. その初期検討として, 論文中から GA の構成要素となりうるコアアイデアを示す Figure の検索を行う. また，集めたデータから研究分野ごとの GA の特徴, GA と論文中の図やテキストとの関係を調査し, 報告する.",
  resources: [
    {
      label: "Poster",
      url: "/publications/kawada2024yans/poster.pdf",
    },
  ],
};
