import Link from "next/link";

interface NewsDetailLinkProps {
  href: string;
  title: string;
}

const className =
  "min-w-0 break-words text-slate-600 transition-colors duration-200 hover:text-blue-600 focus-visible:text-blue-600 focus-visible:outline-none";

export function NewsDetailLink({ href, title }: NewsDetailLinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {title}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {title}
    </Link>
  );
}
