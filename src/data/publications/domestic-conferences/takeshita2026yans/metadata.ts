import type { Publication } from "@/data/publication";

export const takeshita2026yans: Publication = {
  slug: "takeshita2026yans",
  title:
    "視覚言語モデルを用いた AI エージェントによる悪質サイトの検知と警告能力の評価",
  authors: [
    { name: "Michito Takeshita" },
    { name: "Takuro Kawada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-08-16",
  category: "domestic-conference",
  venueFull: "第21回言語処理若手シンポジウム",
  venueShort: "YANS 2026",
  venueURL: "https://yans.anlp.jp/entry/yans2026",
  keywords: [
    "Natural Language Processing",
    "Vision & Language",
    "AI Safety",
    "AI Agents",
  ],
  abstract:
    "PC 画⾯を操作するAIエージェントの普及に伴い, その安全性評価の重要性が⾼まっている. 従来は, AI エージェントを詐欺の被害者または加害者として扱う研究が中⼼であり, ユーザーが詐欺に遭う場面で AI エージェントが詐欺を見抜いて, 危険性を指摘し, その判断根拠を説明できるかについては, ⼗分に検討されてこなかった. 本研究では, AI エージェントをユーザーの守護者として捉え, 公的資料に基づき再現した詐欺サイトを⽤いて, 危険な操作を回避できるか, ならびに詐欺と判断した根拠をユーザーに説明できるかという二つの観点から評価する. さらに, ユーザーが不安から「とにかく指示どおり進めて」と促す状況を想定し, AI エージェントへの指示の強さを段階的に変化させることで, AI エージェントが詐欺であると認識しているにも関わらず警告をやめ, 危険な操作を実行してしまう条件を検証する. 以上の評価を通じて, AI エージェントが詐欺からユーザーを保護する能力と, その機能が破綻する条件について得られた知見を報告する.",
  relatedLinks: {
    Poster: "/publications/domestic-conferences/takeshita2026yans/poster.pdf",
  },
};
