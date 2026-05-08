import { ExperienceTimeline } from "@/components/home/experience-timeline";
import { SectionHeading } from "@/components/home/section-heading";

export function ExperienceSection() {
  return (
    <section id="experience">
      <SectionHeading eyebrow="Timeline" title="Experience" />
      <ExperienceTimeline />
    </section>
  );
}
