import type { Publication } from "@/data/publication";

export const kawada2026nlp: Publication = {
  slug: "kawada2026nlp",
  title:
    "SciGA-Vec: 学術論文におけるベクタ画像形式の Graphical Abstract データセット",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-03-09",
  category: "domestic-conference",
  venueFull: "言語処理学会第32回年次大会",
  venueShort: "NLP 2026",
  venueURL: "https://www.anlp.jp/proceedings/annual_meeting/2026/",
  keywords: [
    "Natural Language Processing",
    "Computer Vision",
    "Vision & Language",
    "Dataset",
    "AI for Science",
  ],
  abstract:
    "Graphical Abstract (GA) は, 論文の主要な貢献を視覚的に伝える重要な表現である. 既存の GA データセットでは画素の集合として画像を表現するラスタ画像としてのみ提供されてきたため, 矩形や矢印, テキストといった構造情報を活用した GA の解析や編集, 生成に関する研究は制限されていた. 本研究では, ラスタ画像を構造情報を保持したベクタ画像へ変換するパイプラインを提案し, 既存の GA データセットに適用することでベクタ形式 GA データセット SciGA-Vec を構築する. SciGA-Vec は, GA の構造的解析や編集可能な生成モデルの学習, 評価を可能とし, GA を構造化インフォグラフィックとして扱う将来の研究の基盤を提供する.",
  resources: [
    {
      label: "Paper",
      url: "https://www.anlp.jp/proceedings/annual_meeting/2026/pdf_dir/Q3-3.pdf",
    },
    {
      label: "Poster",
      url: "/publications/kawada2026nlp/poster.pdf",
    },
  ],
};
