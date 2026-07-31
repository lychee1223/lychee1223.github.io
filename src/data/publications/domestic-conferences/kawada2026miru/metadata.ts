import type { Publication } from "@/data/publication";

export const kawada2026miru: Publication = {
  slug: "kawada2026miru",
  title: "Generation and Evaluation of Editable Graphical Abstracts for Academic Papers",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-08-03",
  category: "domestic-conference",
  venueFull: "第29回 画像の認識・理解シンポジウム",
  venueShort: "MIRU 2026",
  venueURL: "https://miru-committee.github.io/miru2026/",
  keywords: [
    "Computer Vision",
    "Natural Language Processing",
    "Vision & Language",
    "Image Generation",
    "AI for Science",
  ],
  abstract:
    "Graphical abstracts (GAs) are visual summaries that convey the key ideas, methods, and findings of academic papers at a glance. However, existing GA generation methods typically produce raster graphics that are difficult to post-edit and risk hallucinating or fabricating scientific data through image generation. We propose a framework for generating data-grounded GAs directly as editable vector graphics, enabling element-level editing in common drawing tools. We also introduce the Structural Independence Coefficient (SIC) to quantify editing simplicity. Experiments and a user study show that our method improves editability while preserving visual quality, accelerating reliable scientific communication within AI for Science.",
  relatedLinks: {
    Paper: "/publications/kawada2026miru/paper.pdf",
    Poster: "/publications/kawada2026miru/poster.pdf",
  },
};
