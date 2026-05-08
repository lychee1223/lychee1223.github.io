import type { Publication } from "@/data/publication";

export const takeshita2026a11y: Publication = {
  slug: "takeshita2026a11y",
  title:
    "A11y-Compressor: A Framework for Enhancing the Efficiency of GUI Agent Observations through Visual Context Reconstruction and Redundancy Reduction",
  authors: [
    { name: "Michito Takeshita" },
    { name: "Takuro Kawada" },
    { name: "Takumi Ohashi" },
    { name: "Shunsuke Kitada" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-07-02",
  category: "international-conference",
  venueFull:
    "the 64th Annual Meeting of the Association for Computational Linguistics: Student Research Workshop",
  venueShort: "ACL SRW 2026",
  venueURL: "https://2026.aclweb.org/",
  keywords: ["Natural Language Processing", "Vision & Language", "AI Agents"],
  abstract:
    "AI agents that interact with graphical user interfaces (GUIs) require effective observation representations for reliable grounding. The accessibility tree is a commonly used text-based format that encodes UI element attributes, but it suffers from redundancy and lacks structural information such as spatial relationships among elements. We propose A11y-Compressor, a framework that transforms linearized accessibility trees into compact and structured representations. Our implementation, Compressed-a11y, applies a lightweight and structured transformation pipeline with modal detection, redundancy reduction, and semantic structuring. Experiments on the OSWorld benchmark show that Compressed-a11y reduces input tokens to 22% of the original while improving task success rates by 5.1 percentage points on average.",
  resources: [
    {
      label: "arXiv",
      url: "https://arxiv.org/abs/2605.00551",
    },
    {
      label: "ProjectPage",
      url: "https://iyatomilab.github.io/a11y-compressor/",
    },
  ],
};
