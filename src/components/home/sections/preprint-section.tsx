import { PublicationSection } from "@/components/home/sections/publication-section";
import { preprintPublications } from "@/data/publication";

export function PreprintSection() {
  return (
    <PublicationSection
      id="preprint"
      eyebrow="Research"
      title="Preprints"
      publications={preprintPublications}
      seeAllHref="/publications?category=preprint"
    />
  );
}
