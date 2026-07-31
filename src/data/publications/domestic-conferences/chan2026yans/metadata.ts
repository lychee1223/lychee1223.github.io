import type { Publication } from "@/data/publication";

export const chan2026yans: Publication = {
  slug: "chan2026yans",
  title:
    "Where Do Vision-Language Models Preserve and Use Depth Information?",
  authors: [
    { name: "Kunfan Chan" },
    { name: "Takuro Kawada" },
    { name: "Ryugo Morita" },
    { name: "Shunsuke Kitada" },
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
    "Image Understanding",
    "Spatial Reasoning",
  ],
  abstract:
    "Vision-language models (VLMs) can answer some qualitative and ordinal depth questions, but remain substantially weaker at estimating continuous depth magnitudes. However, poor performance alone does not reveal whether the difficulty stems from inferring depth from two-dimensional input or from a failure to preserve and use depth-related information within the model. We address this problem by constructing synthetic images with exact geometric ground truth, independently manipulating true depth and correlated visual cues, and applying controlled linear probes and causal interventions across prespecified stages of the processing pipeline, from the vision encoder to answer generation. This work introduces an analysis framework for identifying where depth-related information is recoverable and whether it causally contributes to the model's answers, thereby providing a basis for diagnosing the mechanisms underlying spatial reasoning in VLMs.",
};
