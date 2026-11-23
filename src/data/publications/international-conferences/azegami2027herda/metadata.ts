import type { Publication } from "@/data/publication";

export const azegami2027herda: Publication = {
  slug: "azegami2027herda",
  title:
    "HeRDA: Healthy-Reference Domain Adaptation for Plant Disease Diagnosis",
  authors: [
    { name: "Tatsuki Azegami" },
    { name: "Takuro Kawada" },
    { name: "Yuji Arima" },
    { name: "Hitoshi Iyatomi" },
  ],
  date: "2027-01-08",
  category: "international-conference",
  venueFull: "IEEE 45th International Conference on Consumer Electronics",
  venueShort: "ICCE 2027",
  venueURL: "https://icce.org/2027/",
  keywords: [
    "Computer Vision",
    "Domain Shift",
    "Image Classification",
    "Plant Disease Diagnosis",
  ],
  abstract:
    "Image-based plant disease diagnosis using mobile devices has attracted increasing attention as a practical tool for crop management. However, diagnostic models trained in one environment often perform poorly in unseen fields due to variations in imaging conditions and cultivation environments. Collecting labeled diseased images from each new field is costly and difficult, limiting practical deployment. To address this challenge, we propose Healthy-Reference Domain Adaptation (HeRDA), which adapts a diagnostic model using only a small number of healthy images from the target domain. HeRDA represents image features relative to domain-specific healthy reference vectors (HRVs), aiming to reduce the influence of domain-dependent components shared between healthy and diseased images while emphasizing disease-related deviations. For target-domain inference, the HRV is estimated from healthy target-domain images, enabling adaptation without collecting diseased target samples or updating model parameters. Experiments on a three-class eggplant disease dataset collected from eight fields demonstrated that HeRDA improved the macro F1-score from 66.95% to 71.34% using only 30 healthy target-domain images. These results suggest the potential of HeRDA for mobile-based plant disease diagnosis across diverse agricultural environments.",
};
