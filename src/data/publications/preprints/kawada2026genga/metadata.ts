import type { Publication } from "@/data/publication";

export const kawada2026genga: Publication = {
  slug: "kawada2026genga",
  title:
    "GenGA: Editable and Data-Grounded Graphical Abstract Generation for Academic Papers",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-08-05",
  category: "preprint",
  venueFull: "arXiv: 2608.05478",
  venueURL: "https://arxiv.org/abs/2608.05478",
  keywords: [
    "Computer Vision",
    "Natural Language Processing",
    "Vision & Language",
    "Image Generation",
    "AI for Science",
  ],
  abstract:
    "Graphical Abstracts (GAs) visually summarize the key findings of academic papers, but existing GA generation methods often output raster graphics that are difficult to revise during writing and peer review. We define editable GA generation from paper content and propose GenGA, a framework that directly produces vector-format figures as hierarchical elements. GenGA enables element-level editing in common drawing tools and introduces the Structural Independence Coefficient (SIC), a metric for estimating editing simplicity. Experiments show that GenGA improves editing simplicity while preserving concise and semantically aligned scientific communication.",
  relatedLinks: {
    arXiv: "https://arxiv.org/abs/2608.05478",
  },
};
