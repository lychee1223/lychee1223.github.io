interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-10 min-w-0 space-y-3 [container-type:inline-size] max-[500px]:mb-7 max-[500px]:space-y-2">
      <div className="flex min-w-0 items-center gap-3 max-[500px]:gap-2">
        <span className="h-px w-14 shrink-0 bg-gradient-to-r from-[color:var(--accent-strong)] to-[color:var(--accent-soft)] max-[500px]:w-9" />
        <span className="min-w-0 break-words text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-strong)] max-[500px]:text-[0.68rem] max-[500px]:tracking-[0.16em] sm:text-[13px]">
          {eyebrow}
        </span>
      </div>
      <h2 className="whitespace-nowrap font-serif text-[clamp(0.92rem,6.4cqw,2.85rem)] leading-[0.95] text-slate-950">
        {title}
      </h2>
    </div>
  );
}
