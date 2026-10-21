import { AwardGrantEntry } from "@/components/awards-grants/award-grant-entry";
import { SectionListFooter } from "@/components/home/section-list-footer";
import { SectionHeading } from "@/components/home/section-heading";
import { awardsGrants } from "@/data/awards-grants";

const homepageAwardGrantLimit = 3;

export function AwardsGrantsSection() {
  const homepageAwardsGrants = awardsGrants.slice(0, homepageAwardGrantLimit);

  if (homepageAwardsGrants.length === 0) {
    return null;
  }

  return (
    <section id="awards-grants" className="min-w-0 max-w-full">
      <SectionHeading eyebrow="Recognition" title="Awards & Grants" />
      <div className="min-w-0 max-w-full divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
        {homepageAwardsGrants.map((item, index) => (
          <AwardGrantEntry
            key={`${item.date}-${item.title}-${index}`}
            item={item}
          />
        ))}
      </div>
      <SectionListFooter
        shownCount={homepageAwardsGrants.length}
        totalCount={awardsGrants.length}
        href={"/awards-grants"}
      />
    </section>
  );
}
