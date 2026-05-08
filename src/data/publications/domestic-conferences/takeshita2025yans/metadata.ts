import type { Publication } from "@/data/publication";

export const takeshita2025yans: Publication = {
  slug: "takeshita2025yans",
  title: "ローカル LLM を用いた AI エージェントの現状と課題",
  authors: [
    { name: "Michito Takeshita" },
    { name: "Takuro Kawada" },
    { name: "Takumi Ohashi" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2025-09-18",
  category: "domestic-conference",
  venueFull: "第20回言語処理若手シンポジウム",
  venueShort: "YANS 2025",
  venueURL: "https://yans.anlp.jp/entry/yans2025",
  keywords: ["Natural Language Processing", "Vision & Language", "AI Agents"],
  abstract:
    "近年, 大規模言語モデル (LLM) をバックボーンとする AI エージェントの研究が急速に発展している. 特に GPT-4o や Gemini などの高性能なクローズド大規模モデルが広く利用されているが, 一方で, 利用コスト・透明性・データ主権の課題が指摘されている. 本研究ではローカル環境で動作可能な軽量 LLM (ローカル LLM) に着目し, AI エージェントとしての可用性を評価した. LLM でも難易度が高いデスクトップ環境アプリケーションの操作タスクを含むベンチマーク OSWorld を用い, 複数のローカル LLM を AI エージェントとして活用し, タスク成功率と推論過程を比較した. その結果, いずれのローカル LLM もクローズド大型モデルに比べて性能は大幅に劣るものの, モデル規模の拡大に伴いタスク成功率の改善傾向が確認された.",
  resources: [
    {
      label: "Poster",
      url: "/publications/takeshita2025yans/poster.pdf",
    },
  ],
};
