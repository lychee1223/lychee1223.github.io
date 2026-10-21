import { formatExperiencePeriod } from "@/utils/date";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import {
  type ExperienceItem,
  type ExperienceMetaContent,
} from "@/data/experience";

const metaLinkClassName =
  "group inline-flex items-baseline gap-1 text-[color:var(--accent-strong)] transition-colors duration-300 hover:underline hover:underline-offset-2";

const timelineRowClassName =
  "grid min-w-0 max-w-full grid-cols-[18px_minmax(0,1fr)] gap-x-3 min-[380px]:grid-cols-[22px_minmax(0,1fr)] sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-x-4";

const toggleClassName =
  "cursor-pointer list-none rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent-strong)] [&::-webkit-details-marker]:hidden";

function renderExperienceMetaContent(
  metaContent: ExperienceMetaContent,
  key: string,
) {
  if (typeof metaContent === "string") {
    return <span key={key}>{metaContent}</span>;
  }

  const isExternal = /^https?:\/\//.test(metaContent.href);

  return (
    <a
      key={key}
      href={metaContent.href}
      className={metaLinkClassName}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <ArrowUpRight
        size={12}
        className="relative top-[0.08em] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
      {metaContent.label}
    </a>
  );
}

function ExperienceEntry({ item }: { item: ExperienceItem }) {
  const period = formatExperiencePeriod(item.start, item.end);
  const organization = item.organizationURL ? (
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
  );
  const dateClassName =
    "mb-2 block break-words pt-0.5 text-[0.66rem] font-normal uppercase tracking-[0.1em] text-slate-600 min-[380px]:text-[0.72rem] min-[380px]:tracking-[0.12em] sm:text-[13px]";
  const organizationClassName =
    "relative block break-words font-serif text-lg font-normal text-slate-950 sm:text-xl";
  const content = (
    <>
      <p className="mt-1 break-words text-sm text-slate-700 sm:text-base">
        {item.titles.join(" / ")}
      </p>
      {item.meta && (
        <p className="mt-3 break-words text-sm leading-relaxed text-slate-700 sm:text-base">
          {item.meta.map((metaContent, metaIndex) =>
            renderExperienceMetaContent(
              metaContent,
              `${item.slug}-meta-${metaIndex}`,
            ),
          )}
        </p>
      )}
    </>
  );

  return (
    <div className="min-w-0 pb-10">
      <p className={dateClassName}>{period}</p>
      <h3 className={organizationClassName}>{organization}</h3>
      {content}
    </div>
  );
}

function ExperienceTimelineRows({
  items,
  continueTimeline = false,
}: {
  items: ExperienceItem[];
  continueTimeline?: boolean;
}) {
  return (
    <div className="min-w-0 max-w-full space-y-1">
      {items.map((item, index) => (
        <div key={item.slug} className={timelineRowClassName}>
          <div className="relative flex justify-center" aria-hidden="true">
            <span
              className={`relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full border-2 bg-white sm:h-3 sm:w-3 ${
                item.end
                  ? "border-slate-400 shadow-[0_0_0_5px_rgba(148,163,184,0.12)] sm:shadow-[0_0_0_6px_rgba(148,163,184,0.12)]"
                  : "border-[color:var(--accent-strong)] shadow-[0_0_0_5px_rgba(59,130,246,0.12)] sm:shadow-[0_0_0_6px_rgba(59,130,246,0.12)]"
              }`}
            />
            {(index < items.length - 1 || continueTimeline) && (
              <span
                className={`absolute top-4 w-px bg-[color:var(--accent-soft)] ${
                  index === items.length - 1 ? "-bottom-1" : "-bottom-4"
                }`}
              />
            )}
          </div>

          <ExperienceEntry item={item} />
        </div>
      ))}
    </div>
  );
}

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  // Items run from newest to oldest; keep every ongoing position visible.
  const earliestCurrentIndex = items.reduce(
    (lastIndex, item, index) => (item.end ? lastIndex : index),
    -1,
  );
  const visibleItems =
    earliestCurrentIndex < 0 ? items : items.slice(0, earliestCurrentIndex + 1);
  const earlierItems =
    earliestCurrentIndex < 0 ? [] : items.slice(earliestCurrentIndex + 1);

  return (
    <div className="min-w-0 max-w-full space-y-1">
      <ExperienceTimelineRows
        items={visibleItems}
        continueTimeline={earlierItems.length > 0}
      />
      {earlierItems.length > 0 && (
        <details className="group/history min-w-0">
          <summary
            className={`${timelineRowClassName} ${toggleClassName} pointer-events-none min-h-12 text-slate-500 transition-colors hover:text-[color:var(--accent-strong)]`}
          >
            <span className="relative flex justify-center" aria-hidden="true">
              <span className="experience-history-rail" />
            </span>
            <span className="pointer-events-auto inline-flex w-fit items-center gap-1.5 self-center text-xs font-medium">
              <ChevronDown
                size={14}
                className="shrink-0 transition-transform group-open/history:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
              <span className="group-open/history:hidden">Show more</span>
              <span className="hidden group-open/history:inline">
                Show less
              </span>
            </span>
          </summary>
          <ExperienceTimelineRows items={earlierItems} />
        </details>
      )}
    </div>
  );
}
