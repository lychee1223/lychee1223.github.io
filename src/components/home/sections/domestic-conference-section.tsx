import { PublicationSection } from "@/components/home/sections/publication-section";
import { domesticConferencePublications } from "@/data/publication";

export function DomesticConferenceSection() {
  return (
    <PublicationSection
      id="domestic-conference"
      eyebrow="Research"
      title="Domestic Conferences"
      publications={domesticConferencePublications}
      seeAllHref="/publications?category=domestic-conference"
    />
  );
}
