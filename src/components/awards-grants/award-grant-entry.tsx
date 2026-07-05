import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  getAwardGrantRelatedLinks,
  type AwardGrantRelatedLinkKey,
  type AwardGrantItem,
} from "@/data/awards-grants";
import { formatYearMonthDate } from "@/utils/date";

function AwardGrantLinkButton({
  linkKey,
  url,
  label,
}: {
  linkKey: AwardGrantRelatedLinkKey;
  url: string;
  label: string;
}) {
  const className =
    "group inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3 py-1.5 text-xs font-medium text-blue-800 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-950";
  const content = (
    <>
      <ArrowUpRight
        size={12}
        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
      />
      <span className="tracking-wider">{label}</span>
    </>
  );

  if (linkKey === "Publication") {
    return (
      <Link href={url} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={url}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
}

export function AwardGrantEntry({
  item,
  index,
}: {
  item: AwardGrantItem;
  index: number;
}) {
  const relatedLinks = getAwardGrantRelatedLinks(item);
  const receivedItems = item.receivedItems ?? [];

  return (
    <article
      key={`${item.date}-${item.title}-${index}`}
      className="grid min-w-0 grid-cols-1 items-center gap-3 py-5 max-[500px]:py-4 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-5 sm:px-3"
    >
      <time className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-slate-500 max-[500px]:text-[0.66rem] max-[500px]:tracking-[0.12em]">
        {formatYearMonthDate(item.date)}
      </time>
      <div className="min-w-0">
        <h3 className="min-w-0 break-words font-serif text-base font-semibold leading-snug text-slate-950 sm:text-lg">
          {item.title}
        </h3>
        {item.description && (
          <p className="paper-copy mt-2 text-sm leading-relaxed text-zinc-700">
            {item.description}
          </p>
        )}
        {receivedItems.length > 0 && (
          <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs text-slate-600">
            <span className="font-medium uppercase tracking-[0.14em] text-slate-500">
              Received
            </span>
            {receivedItems.map((receivedItem, itemIndex) => (
              <span key={receivedItem} className="min-w-0 break-words">
                {receivedItem}
                {itemIndex < receivedItems.length - 1 && (
                  <span className="text-slate-400">,</span>
                )}
              </span>
            ))}
          </p>
        )}
        {relatedLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <AwardGrantLinkButton
                key={`${link.key}-${link.url}`}
                linkKey={link.key}
                url={link.url}
                label={link.label}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
