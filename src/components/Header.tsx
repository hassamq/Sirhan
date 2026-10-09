"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { Logo } from "./Logo";
import { isNavActive, primaryNav, type NavItem } from "@/lib/nav";
import { useSite } from "@/components/SiteProvider";

export function Header() {
  const pathname = usePathname();
  const { nav } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items: NavItem[] = useMemo(() => {
    if (!nav?.length) return primaryNav;
    return nav.map((item) => {
      const match = primaryNav.find(
        (p) => p.href === item.href || p.match === item.href
      );
      return {
        label: item.label,
        href: item.href,
        match: item.href === "/" ? "/" : item.href,
        children: match?.children,
      };
    });
  }, [nav]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-line bg-cream/90 shadow-[0_8px_30px_rgba(6,20,27,0.06)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {items.map((item) => {
            const active = isNavActive(pathname, item);
            return (
              <div key={`${item.href}-${item.label}`} className="group relative">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-2 text-[0.78rem] font-medium transition-colors xl:px-2.5 xl:text-[0.8125rem] ${
                    active ? "text-navy" : "text-stone hover:text-navy"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  )}
                </Link>
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-sage-deep" />
                )}
                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-[13rem] translate-y-1 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="rounded-lg border border-line bg-paper py-2 shadow-[0_12px_40px_rgba(6,20,27,0.1)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-stone hover:bg-sage-soft/50 hover:text-navy"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <Link href="/book" className="btn btn-outline px-4">
            Book Support
          </Link>
          <Link href="/login" className="btn btn-ghost gap-2 px-3.5">
            <User className="h-4 w-4" />
            Login
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-navy lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-cream lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {items.map((item) => (
              <div key={`${item.href}-${item.label}-m`}>
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium hover:bg-sage-soft/40 hover:text-navy ${
                    isNavActive(pathname, item) ? "text-navy" : "text-stone"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="mb-1 ml-3 border-l border-line pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-2 py-2 text-sm text-muted hover:text-navy"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
              <Link href="/book" className="btn btn-primary">
                Book Support
              </Link>
              <Link href="/login" className="btn btn-ghost">
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
