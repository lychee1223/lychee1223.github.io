import type { Publication } from "@/data/publication";

export const kawada2025miru: Publication = {
  slug: "kawada2025miru",
  title: "グラフィカルアブストラクト推薦と評価の統合ベンチマーク",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Sota Nemoto" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2025-07-29",
  category: "domestic-conference",
  venueFull: "第28回 画像の認識・理解シンポジウム",
  venueShort: "MIRU2025",
  venueURL: "https://cvim.ipsj.or.jp/MIRU2025/",
  keywords: [
    "Natural Language Processing",
    "Computer Vision",
    "Vision & Language",
    "Image Retrieval",
    "AI for Science",
  ],
  abstract:
    "Graphical Abstract (GA) は論文の要点を視覚的に伝える重要な表現手段である.効果的な GA の作成には高度なデザインスキルが求められるため, 設計支援技術の実現が期待される.近年, 科学論文の本文や図に加えて GA を含む論文データセット SciGA が構築され, GA 設計支援の計算基盤が整いつつある.本研究では, GA 設計支援を目的とする2つの推薦タスクを定義する: 1) Intra-GA Recommendation: 同一論文内から GA に適した図を推薦するタスク. 2) Inter-GA Recommendation: ある論文の GA 作成において, 参考となる他の論文の GA を推薦するタスク.各タスクに対し, SciGA を用いて複数手法のベンチマーク評価を行い, 性能を比較・分析する.さらに, 正解が曖昧な推薦タスクにおける新評価指標 Confidence Adjusted top-1 ground truth Ratio (CAR) を提案する.CAR は, 構築されたたランキングに対するモデルの確信度とその妥当性を考慮し, 推薦結果をインスタンスレベルで評価する.本研究は, GA 推薦による研究成果の視覚的伝達の支援と, その評価枠組みの確立に貢献する.",
  resources: [
    {
      label: "Paper",
      url: "/publications/kawada2025miru/paper.pdf",
    },
    {
      label: "Poster",
      url: "/publications/kawada2025miru/poster.pdf",
    },
  ],
};
