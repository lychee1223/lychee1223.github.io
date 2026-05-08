import { PublicationSection } from "@/components/home/sections/publication-section";
import { internationalConferencePublications } from "@/data/publication";

export function InternationalConferenceSection() {
  return (
    <PublicationSection
      id="international-conference"
      eyebrow="Research"
      title="International Conferences"
      publications={internationalConferencePublications}
      seeAllHref="/publications?category=international-conference"
    />
  );
}
