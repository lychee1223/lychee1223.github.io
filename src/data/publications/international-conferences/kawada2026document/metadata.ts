import type { Publication } from "@/data/publication";

export const kawada2026document: Publication = {
  slug: "kawada2026document",
  title:
    "Document-Grounded Coaching Agent for Video Skill Assessment",
  authors: [
    { name: "Takuro Kawada" },
    { name: "Masaya Fujiwaka" },
    { name: "Xiaotong Ji" },
    { name: "Jianquan Liu" },
  ],
  date: "2026-08-09",
  category: "international-conference",
  venueFull:
    "The 9th IEEE International Conference on Multimedia Information Processing and Retrieval",
  venueShort: "MIPR 2026",
  venueURL: "https://mipr2026.org/",
  keywords: [
    "Natural Language Processing",
    "Computer Vision",
    "Vision & Language",
    "AI Agents",
    "Video Understanding",
  ],
  abstract:
    "This paper presents a document-grounded coaching framework that evaluates learner behavior in videos using instructional materials (e.g., books and manuals) as normative references, without relying on expert reference videos or additional supervised training. The framework first structures document content into an ordered rubric of procedural steps and step-specific evaluation norms. It then estimates step intervals in learner videos under ordering constraints and computes time-wise deviation scores from the corresponding norms. Experiments on 280 basketball practice videos from Ego-Exo4D, paired with a basketball instructional manual, show that the proposed framework provides more accurate step-interval estimation than representative baseline methods. The estimated deviation scores also provide clearer separation between beginners and experts, and qualitative analysis indicates consistency with human judgments of norm violations. These results suggest that document-grounded coaching is a practical and interpretable framework for capturing both temporal structure and execution quality of skill performance.",
};
