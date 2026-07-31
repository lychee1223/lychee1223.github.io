import type { Publication } from "@/data/publication";

export const nishiyama2026yans: Publication = {
  slug: "nishiyama2026yans",
  title:
    "Activation Steering における文章崩壊の抑制に向けた初期検討",
  authors: [
    { name: "Sora Nishiyama" },
    { name: "Takuro Kawada" },
    { name: "Shunsuke Kitada" },
    { name: "Daichi Nagai" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-08-16",
  category: "domestic-conference",
  venueFull: "第21回言語処理若手シンポジウム",
  venueShort: "YANS 2026",
  venueURL: "https://yans.anlp.jp/entry/yans2026",
  keywords: [
    "Natural Language Processing",
    "Activation Steering",
  ],
  abstract:
    "近年, 大規模言語モデル (LLM) の出力を望ましい属性へと誘導する手法として, 推論時の内部状態に直接介入する Activation Steering (AS) が注目を集めている. 既存の AS で用いられるステアリングベクトルには, 様々な概念が交絡していることが多く, 単純なベクトル加算では目的外の内部表現まで過度に改変されてしまい, 制御強度を強めると生成文の流暢性が著しく損なわれる課題がある. 本研究では, 無関係な特徴への干渉を最小化しつつ, トークン位置ごとの強度最適化を組み合わせることで, 制御強度を高めても生成文が破綻しない新たな出力制御手法を提案する. 本手法を広く利用されている一般的なローカル LLM に適用し, ステアリングの方向と強度の両面を制御することで, 強い制御下でも生成文の自然さ・流暢性が維持されることを検証する.",
};
