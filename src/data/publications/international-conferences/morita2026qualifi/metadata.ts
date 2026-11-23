import type { Publication } from "@/data/publication";

export const morita2026qualifi: Publication = {
  slug: "morita2026qualifi",
  title:
    "	Is Human Review Still All You Need? Measuring Quality Perception in Qualitative Figures",
  authors: [
    { name: "Ryugo Morita" },
    { name: "Takuro Kawada" },
    { name: "Ko Watanabe" },
    { name: "Ryotaro Shimizu" },
    { name: "Andreas Dengel" },
  ],
  date: "2026-12-12",
  category: "international-conference",
  venueFull:
    "The Fortieth Annual Conference on Neural Information Processing Systems–“AI for Science: Verification in the Age of AI Scientists” Workshop",
  venueShort: "NeurIPS 2026 Workshop AI4Science",
  venueURL: "https://ai4sciencecommunity.github.io/neurips26",
  keywords: [
    "Computer Vision",
    "Vision & Language",
    "Dataset & Benchmark",
    "Image Understanding",
    "Evaluation Bias",
    "AI for Science",
  ],
  abstract:
    "Vision-language models (VLMs) now write and review scientific papers, and top-tier conferences have begun integrating AI into the review process itself. Yet reviewing is already under strain. AI-generated hallucinations, including citations to nonexistent papers, are passing peer review undetected. Such textual errors are increasingly caught by automated checks, and even claims about tables and charts can be verified against the numbers they plot. But the central claim of a vision paper, that its results look better, exists only in the pixels. For work that argues it outperforms prior methods, or defines a new task where no metric yet applies, that judgment is the paper's value. We introduce QualiFi-Bench, the first benchmark to make that judgment measurable. It breaks the reviewer's act into four tasks: reading a figure's structure, grounding quality and content in its panels, verifying claims, and writing the qualitative paragraph. Each is made answerable through a synthetic suite of roughly 14K figures, built so that quality and every non-pixel cue can be set independently, and 280 expert-annotated published figures carrying 1,298 panel-grounded claims. Across eighteen open VLMs and frontier models, models read figures but do not see their quality. Content grounding is largely solved while nearly all models are at chance on fine quality ranking. Into that void, non-pixel cues take over. Printed metrics, method names, and asserted provenance each reorder the quality a model reports. Relocating a single printed number, with no pixel changed, flips GPT-4o from 0.95 to 0.20 accuracy. What models apply is not a reflex toward conspicuous text but a schema of what certifies quality. It deepens as perception weakens, propagates into the text models write, and overrides even a demonstrably intact percept on panels from real generative models. The models trusted to review visual evidence cannot yet see it, and QualiFi-Bench makes that failure impossible to ignore.",
  relatedLinks: {
    Paper: "https://neurips.cc/virtual/2026/loc/sydney/156580",
  },
};
