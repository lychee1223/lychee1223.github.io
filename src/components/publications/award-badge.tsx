export function AwardBadge({ award }: { award: string }) {
  return (
    <div className="award-badge group relative inline-flex max-w-full shrink-0 overflow-hidden whitespace-nowrap rounded-md border border-amber-100/50 bg-gradient-to-r from-amber-50 to-rose-50 px-2 py-1 shadow-md transition-transform duration-300 max-[500px]:whitespace-normal max-[500px]:px-2 max-[500px]:py-0.5">
      <div className="award-badge-shine absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/90 to-transparent transition-transform duration-1000" />
      <p className="relative min-w-0 break-words text-xs font-medium text-amber-700 max-[500px]:text-[0.68rem]">
        {award}
      </p>
    </div>
  );
}
