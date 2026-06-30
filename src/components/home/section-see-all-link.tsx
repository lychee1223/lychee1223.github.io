import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionSeeAllLinkProps {
  href: string;
}

export function SectionSeeAllLink({ href }: SectionSeeAllLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 whitespace-nowrap items-center gap-2 rounded-full border border-blue-200 bg-blue-50/90 px-3 py-1.5 text-xs font-medium text-blue-800 transition-colors duration-300 hover:bg-blue-100 hover:text-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
    >
      <span className="tracking-wider">See All</span>
      <ArrowRight
        size={12}
        className="transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
