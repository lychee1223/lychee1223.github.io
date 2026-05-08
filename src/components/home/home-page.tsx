import type { ComponentType } from "react";
import { ProfileSidebar } from "@/components/home/profile-sidebar";
import { AboutSection } from "@/components/home/sections/about-section";
import { DomesticConferenceSection } from "@/components/home/sections/domestic-conference-section";
import { InternationalConferenceSection } from "@/components/home/sections/international-conference-section";
import { ExperienceSection } from "@/components/home/sections/experience-section";
import { TalksArticlesSection } from "@/components/home/sections/talks-articles-section";
import { aboutMe } from "@/data/aboutme";
import { sectionOrder, Section } from "@/data/section-order";

const sectionComponents: Record<Section, ComponentType> = {
  [Section.InternationalConference]: InternationalConferenceSection,
  [Section.DomesticConference]: DomesticConferenceSection,
  [Section.Articles]: TalksArticlesSection,
  [Section.Experience]: ExperienceSection,
};

export function HomePage() {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto w-full max-w-screen-xl overflow-x-clip px-5 pb-16 pt-6 max-[500px]:max-w-[100dvw] max-[500px]:px-3 max-[500px]:pb-12 sm:px-6 sm:pb-20 sm:pt-8">
        <div className="grid min-w-0 grid-cols-1 gap-10 max-[500px]:gap-7 md:grid-cols-12 md:gap-6">
          <div className="home-profile-sidebar col-span-12 mb-8 min-w-0 space-y-12 max-[500px]:mb-5 max-[500px]:space-y-8 md:col-span-4 md:mb-0 md:self-start">
            <ProfileSidebar aboutMe={aboutMe} />
          </div>

          <div className="col-span-12 min-w-0 space-y-24 max-[500px]:space-y-16 md:col-span-7 md:col-start-6">
            <AboutSection />
            {sectionOrder.map((sectionName) => {
              const SectionComponent = sectionComponents[sectionName];

              return <SectionComponent key={sectionName} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
