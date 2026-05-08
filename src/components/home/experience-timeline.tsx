import { formatExperiencePeriod, experienceData } from "@/data/experience";

export function ExperienceTimeline() {
  const items = experienceData;

  return (
    <div className="min-w-0 max-w-full space-y-1">
      {items.map((item, index) => (
        <div
          key={item.slug}
          className="grid min-w-0 max-w-full grid-cols-[18px_minmax(0,1fr)] gap-x-3 min-[380px]:grid-cols-[22px_minmax(0,1fr)] sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-x-4"
        >
          <div className="relative flex justify-center">
            <span className="mt-1.5 h-2.5 w-2.5 rounded-full border-2 border-[color:var(--accent-strong)] bg-white shadow-[0_0_0_5px_rgba(59,130,246,0.12)] sm:h-3 sm:w-3 sm:shadow-[0_0_0_6px_rgba(59,130,246,0.12)]" />
            {index < items.length - 1 && (
              <span className="absolute top-5 h-[calc(100%+1.5rem)] w-px bg-gradient-to-b from-[color:var(--accent-soft)] to-transparent" />
            )}
          </div>

          <div className="min-w-0 pb-10">
            <p className="mb-2 break-words pt-0.5 text-[0.66rem] uppercase tracking-[0.1em] text-slate-600 min-[380px]:text-[0.72rem] min-[380px]:tracking-[0.12em] sm:text-[13px]">
              {formatExperiencePeriod(item.start, item.end)}
            </p>
            <h3 className="break-words font-serif text-lg text-slate-950 sm:text-xl">
              {item.organizationURL ? (
                <a
                  href={item.organizationURL}
                  className="transition-colors duration-300 hover:text-[color:var(--accent-strong)] hover:underline hover:underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.organization}
                </a>
              ) : (
                item.organization
              )}
            </h3>
            <p className="mt-1 break-words text-sm text-slate-700 sm:text-base">
              {item.titles.join(" / ")}
            </p>
            {item.meta && (
              <p className="mt-3 break-words text-sm leading-relaxed text-slate-700 sm:text-base">
                {item.meta.join(" / ")}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
