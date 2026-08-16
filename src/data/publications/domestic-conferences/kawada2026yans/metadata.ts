import type { Publication } from "@/data/publication";

export const kawada2026yans: Publication = {
  slug: "kawada2026yans",
  title:
    "Code2Figure: 学術論文における実装コードに基づくモデル図生成の初期検討",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Ryugo Morita" },
    { name: "Ryotaro Shimizu" },
    { name: "Ko Watanabe" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-08-16",
  category: "domestic-conference",
  venueFull: "第21回言語処理若手シンポジウム",
  venueShort: "YANS 2026",
  venueURL: "https://yans.anlp.jp/entry/yans2026",
  keywords: [
    "Natural Language Processing",
    "Computer Vision",
    "Vision & Language",
    "Image Generation",
    "AI for Science",
  ],
  abstract:
    "計算機実験を伴う科学研究において, 提案手法の構造を表すモデル図は研究過程における提案内容の整理や議論, および論文読者の理解を支える重要な媒体である. また, 科学研究の提案手法に関する情報は, 論文本文やその実装コードなど, 複数の研究成果物に含まれる. 近年, 論文本文から科学図を生成する研究が進んでいるが, 実装コードの利用や複数成果物の統合が生成結果に与える影響は明らかでない. 本研究では, 論文本文および実装コードを入力とするモデル図生成タスク Code2Figure を導入し, 論文, 実装コード, 著者が作成したモデル図を対応付けたベンチマークを構築する. さらに, 入力成果物から提案手法に関わる構成要素と接続関係を抽出し, 構造化表現を介してモデル図を生成するパイプラインを提案する. 構築したベンチマークを用いた評価を通じて, 論文本文と実装コードの各研究成果物がモデル図生成結果に与える影響を検証し, Code2Figure における主要な課題を分析する.",
  relatedLinks: {
    Poster: "/publications/domestic-conferences/kawada2026yans/poster.pdf",
  },
};
