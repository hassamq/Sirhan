"use client";

import { createContext, useContext } from "react";

export type SiteSettings = {
  brandName?: string;
  tagline?: string;
  siteTitle?: string;
  siteDescription?: string;
  colors?: Record<string, string>;
  fonts?: Record<string, string>;
  images?: {
    logo?: string;
    hero?: string;
    favicon?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    location?: string;
    hours?: string;
  };
  social?: Record<string, string>;
};

export type SitePage = {
  slug: string;
  title: string;
  sections?: Record<string, Record<string, string>>;
};

export type SitePost = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  publishedAt?: string;
};

export type SiteNavItem = {
  _id: string;
  label: string;
  href: string;
  order: number;
};

type SiteContextValue = {
  settings: SiteSettings | null;
  pages: SitePage[];
  posts: SitePost[];
  nav: SiteNavItem[];
};

const SiteContext = createContext<SiteContextValue>({
  settings: null,
  pages: [],
  posts: [],
  nav: [],
});

export function SiteProvider({
  value,
  children,
}: {
  value: SiteContextValue;
  children: React.ReactNode;
}) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}

export function usePageSection(slug: string, section: string) {
  const { pages } = useSite();
  const page = pages.find((p) => p.slug === slug);
  return page?.sections?.[section] || {};
}
