import { aboutMe } from "@/data/aboutme";
import { SectionHeading } from "@/components/home/section-heading";

function splitHighlightMarker(highlight: string) {
  const match = highlight.match(/^(\S+)\s+(.*)$/);

  if (!match) {
    return { marker: "•", content: highlight };
  }

  return {
    marker: match[1],
    content: match[2],
  };
}

export function AboutSection() {
  if (
    !aboutMe.description &&
    !aboutMe.interests?.length &&
    !aboutMe.biographyHighlights?.length
  ) {
    return null;
  }

  return (
    <section id="about" className="min-w-0 max-w-full">
      <SectionHeading eyebrow="Introduction" title="Biography" />
      <div className="min-w-0 max-w-full">
        {aboutMe.description && (
          <p
            className="paper-copy max-w-2xl font-serif text-[1.02rem] leading-8 text-slate-800 max-[500px]:text-[0.95rem] max-[500px]:leading-7 sm:text-[1.08rem] [&_a]:text-[color:var(--accent-strong)] [&_a]:no-underline [&_a:hover]:underline [&_a:hover]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: aboutMe.description }}
          />
        )}
        {aboutMe.interests && aboutMe.interests.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)] max-[500px]:text-xs max-[500px]:tracking-[0.14em]">
              Interests
            </p>
            <div className="flex flex-wrap gap-2.5 max-[500px]:gap-2">
              {aboutMe.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-blue-200 bg-blue-50/90 px-3 py-1.5 text-sm font-medium text-blue-800 max-[500px]:px-2.5 max-[500px]:py-1 max-[500px]:text-xs"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
        {aboutMe.biographyHighlights &&
          aboutMe.biographyHighlights.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-strong)] max-[500px]:text-xs max-[500px]:tracking-[0.14em]">
                Personality Traits
              </p>
              <ul className="paper-copy space-y-3 text-base leading-8 text-slate-700 max-[500px]:text-[0.95rem] max-[500px]:leading-7 sm:text-[1.02rem]">
                {aboutMe.biographyHighlights.map((highlight) => {
                  const { marker, content } = splitHighlightMarker(highlight);

                  return (
                    <li
                      key={highlight}
                      className="flex min-w-0 items-start gap-3 max-[500px]:gap-2"
                    >
                      <span className="mt-[0.18rem] shrink-0 text-[1.45rem] leading-none max-[500px]:text-[1.2rem]">
                        {marker}
                      </span>
                      <span>{content}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
      </div>
    </section>
  );
}
