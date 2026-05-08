import type { Publication } from "@/data/publication";

export const chan2025yans: Publication = {
  slug: "chan2025yans",
  title: "WRIME-TC: 時間的文脈による書き手と読み手の感情分析の強化",
  authors: [
    { name: "Kunfan Chan", equalContribution: true },
    { name: "Yutaro Tanaka", equalContribution: true },
    { name: "Tsubasa Nakagawa", equalContribution: true },
    { name: "Shunsuke Kitada" },
    { name: "Takuro Kawada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2025-09-18",
  category: "domestic-conference",
  venueFull: "第20回言語処理若手シンポジウム",
  venueShort: "YANS 2025",
  venueURL: "https://yans.anlp.jp/entry/yans2025",
  keywords: ["Natural Language Processing", "Sentiment Analysis"],
  abstract:
    "本報告では, 書き手と読み手の感情ラベルを含む日本語 SNS 投稿を収録した WRIME データセットを拡張した WRIME-TC (time-contextualized; TC) を提案する. WRIME-TC では, 投稿の前後 1 週間以内の関連投稿を追加することで, 従来考慮されていなかった時間的文脈を利用可能にした. WRIME-TC を用いた感情分析では, 深層学習モデルに時間と関連性に基づく重み付けを組み込んだ提案手法を適用し, 特に持続的な否定的感情の予測が向上した. さらに, この手法は zero-shot 推論や fine-tuning を施した大規模言語モデル (LLM) に対しても優位性を示した. このデータセットは, 感情分析における書き手と読み手の歳をより正確に捉えるうえで大きな貢献が期待される.",
  resources: [
    {
      label: "Poster",
      url: "/publications/chan2025yans/poster.pdf",
    },
  ],
};
