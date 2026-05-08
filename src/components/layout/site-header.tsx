import { SiteHeaderClient } from "./site-header-client";

const navItems = [
  { href: "/", label: "Home" },
  {
    label: "Publications",
    children: [
      {
        href: "/#international-conference",
        label: "International Conferences",
      },
      { href: "/#domestic-conference", label: "Domestic Conferences" },
    ],
  },
  { href: "/#articles", label: "Talks" },
  { href: "/#experience", label: "Experience" },
];

export function SiteHeader() {
  return <SiteHeaderClient navItems={navItems} />;
}
