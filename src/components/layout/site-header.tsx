import { SiteHeaderClient } from "./site-header-client";
import { preprintPublications } from "@/data/publication";

const publicationNavItems = [
  {
    href: "/#international-conference",
    label: "International Conferences",
  },
  { href: "/#domestic-conference", label: "Domestic Conferences" },
  ...(preprintPublications.length > 0
    ? [
        {
          href: "/#preprint",
          label: "Preprints",
        },
      ]
    : []),
];

const navItems = [
  { href: "/", label: "Home" },
  { href: "/#news", label: "News" },
  {
    label: "Publications",
    children: publicationNavItems,
  },
  { href: "/#articles", label: "Talks" },
  { href: "/#experience", label: "Experience" },
  { href: "/#awards-grants", label: "Awards" },
];

export function SiteHeader() {
  return <SiteHeaderClient navItems={navItems} />;
}
