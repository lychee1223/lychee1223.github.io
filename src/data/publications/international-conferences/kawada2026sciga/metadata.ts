import type { Publication } from "@/data/publication";

export const kawada2026sciga: Publication = {
  slug: "kawada2026sciga",
  title:
    "SciGA: A Comprehensive Dataset for Designing Graphical Abstracts in Academic Papers",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Shunsuke Kitada" },
    { name: "Sota Nemoto" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2026-06-03",
  category: "international-conference",
  venueFull:
    "the 2026 IEEE/CVF Conference on Computer Vision and Pattern Recognition–FINDINGS Track",
  venueShort: "CVPRF 2026",
  venueURL: "https://cvpr.thecvf.com/Conferences/2026",
  keywords: [
    "Natural Language Processing",
    "Computer Vision",
    "Vision & Language",
    "Dataset",
    "Image Retrieval",
    "AI for Science",
  ],
  abstract:
    "Graphical Abstracts (GAs) play a crucial role in visually conveying the key findings of scientific papers. Although recent research increasingly incorporates visual materials such as Figure 1 as de facto GAs, their potential to enhance scientific communication remains largely unexplored. Designing effective GAs requires advanced visualization skills, hindering their widespread adoption. To tackle these challenges, we introduce SciGA-145k, a large-scale dataset comprising approximately 145,000 scientific papers and 1.14 million figures, specifically designed to support GA selection and recommendation, and to facilitate research in automated GA generation. As a preliminary step toward GA design support, we define two tasks: 1) Intra-GA Recommendation, identifying figures within a given paper well-suited as GAs, and 2) Inter-GA Recommendation, retrieving GAs from other papers to inspire new GA designs. Furthermore, we propose Confidence Adjusted top-1 ground truth Ratio (CAR), a novel recommendation metric for fine-grained analysis of model behavior. CAR addresses limitations of traditional rank-based metrics by considering that not only an explicitly labeled GA but also other in-paper figures may plausibly serve as GAs. Benchmark results demonstrate the viability of our tasks and the effectiveness of CAR. Collectively, these establish a foundation for advancing scientific communication within AI for Science.",
  resources: [
    {
      label: "arXiv",
      url: "https://arxiv.org/abs/2507.02212",
    },
    {
      label: "Code",
      url: "https://github.com/IyatomiLab/SciGA",
    },
    {
      label: "Dataset",
      url: "https://huggingface.co/datasets/iyatomilab/SciGA",
    },
    {
      label: "ProjectPage",
      url: "https://iyatomilab.github.io/SciGA/",
    },
  ],
};
