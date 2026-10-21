import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { SectionHeading } from "@/components/home/section-heading";
import { experienceData } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience">
      <SectionHeading eyebrow="Timeline" title="Experience" />
      <ExperienceTimeline items={experienceData} />
    </section>
  );
}
