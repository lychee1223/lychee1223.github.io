"use client";

import { useNavigationMenu } from "./use-navigation-menu";
import Link from "next/link";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";

interface NavChildItem {
  href: string;
  label: string;
}

type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; href?: never; children: NavChildItem[] };

interface SiteHeaderClientProps {
  navItems: NavItem[];
  siteName: string;
}

export function SiteHeaderClient({
  navItems,
  siteName,
}: SiteHeaderClientProps) {
  const {
    isPublicationsOpen,
    setIsPublicationsOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isMobileMenuSwiping,
    mobileMenuSwipeOffset,
    publicationsMenuRef,
    mobileMenuPanelRef,
    handleMobileMenuTouchStart,
    handleMobileMenuTouchMove,
    finishMobileMenuSwipe,
  } = useNavigationMenu();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--line-strong)] bg-[color:var(--page-bg)]/95 shadow-[0_14px_32px_-28px_rgba(37,99,235,0.4)] backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(37,99,235,0.14)_0%,rgba(142,197,255,0.12)_34%,rgba(236,245,255,0.72)_100%)]" />
      <div className="relative mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="inline-flex min-w-0 flex-1 items-center text-lg text-slate-900 transition-colors duration-300 hover:text-[color:var(--accent-strong)] lg:flex-none"
        >
          <span className="block truncate font-serif text-[1.45rem] tracking-[0.04em] min-[380px]:text-[1.65rem] sm:text-[1.95rem] sm:tracking-[0.06em]">
            {siteName}
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 p-2 text-white transition-colors duration-300 hover:bg-zinc-700 lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <nav className="hidden flex-wrap items-start justify-end gap-5 text-sm uppercase tracking-[0.2em] text-slate-600 sm:text-[15px] lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              ref={item.children ? publicationsMenuRef : undefined}
            >
              {item.children && (
                <>
                  <button
                    type="button"
                    className="flex items-center gap-1 uppercase transition-colors duration-300 hover:text-[color:var(--accent-strong)]"
                    onClick={() => setIsPublicationsOpen((open) => !open)}
                    aria-expanded={isPublicationsOpen}
                    aria-haspopup="menu"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        isPublicationsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isPublicationsOpen && (
                    <div className="absolute left-0 top-full mt-3 min-w-[18rem] rounded-2xl border border-[color:var(--line-strong)] bg-white p-4 text-xs normal-case tracking-[0.12em] text-slate-700 shadow-[0_24px_56px_-30px_rgba(15,23,42,0.28)] sm:min-w-[19rem] sm:text-sm">
                      <div className="flex flex-col gap-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="whitespace-nowrap rounded-xl px-3 py-2 transition-colors duration-300 hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--accent-strong)]"
                            onClick={() => setIsPublicationsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              {!item.children && item.href && (
                <Link
                  href={item.href}
                  className="transition-colors duration-300 hover:text-[color:var(--accent-strong)]"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-zinc-950/48 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
        <div
          ref={mobileMenuPanelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="absolute inset-y-0 right-0 flex h-dvh min-h-dvh w-[min(86vw,22rem)] flex-col bg-zinc-800 shadow-[-18px_0_48px_-30px_rgba(15,23,42,0.45)] will-change-transform"
          style={{
            transform: isMobileMenuOpen
              ? `translateX(${mobileMenuSwipeOffset}px)`
              : "translateX(calc(100% + 1rem))",
            transition: isMobileMenuSwiping
              ? "none"
              : "transform 300ms ease-out",
          }}
          onTouchStart={handleMobileMenuTouchStart}
          onTouchMove={handleMobileMenuTouchMove}
          onTouchEnd={finishMobileMenuSwipe}
          onTouchCancel={finishMobileMenuSwipe}
        >
          <div className="flex items-center justify-between bg-zinc-800 px-6 py-5">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-200">
              Menu
            </span>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 p-2 text-white transition-colors duration-300 hover:bg-zinc-700"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-2 bg-zinc-800 px-4 py-5 text-base text-zinc-100">
            {navItems.map((item) => (
              <div key={item.label} className="rounded-2xl bg-zinc-800">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block rounded-2xl bg-zinc-800 px-4 py-3 font-medium transition-colors duration-300 hover:bg-zinc-700 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div className="rounded-2xl bg-zinc-800 px-4 py-3">
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300">
                      {item.label}
                    </div>
                    <div className="mt-3 flex flex-col gap-2">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-xl bg-zinc-800 px-3 py-2 text-[0.98rem] text-zinc-100 transition-colors duration-300 hover:bg-zinc-700 hover:text-white"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
