import { AwardGrantEntry } from "@/components/awards-grants/award-grant-entry";
import { awardsGrants } from "@/data/awards-grants";

export default function AwardsGrantsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <main className="mx-auto max-w-screen-md px-5 py-20 sm:px-8">
        <section>
          <h1 className="mb-3 font-serif text-3xl font-bold leading-snug text-zinc-900">
            Awards & Grants
          </h1>
          <p className="mb-12 text-sm text-zinc-700">
            Awards, scholarships, and grants received through research, academic
            work, and community activities.
          </p>
          <div className="min-w-0 max-w-full divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
            {awardsGrants.map((item, index) => (
              <AwardGrantEntry
                key={`${item.date}-${item.title}-${index}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
