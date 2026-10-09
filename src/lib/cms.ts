import { connection } from "next/server";
import { ensureSeeded } from "@/lib/seed";
import { connectDb } from "@/lib/db";
import { BlogPost, NavItem, PageContent, SiteSettings } from "@/lib/models";

export async function getSiteData() {
  // Opt out of Full Route Cache so admin edits appear on refresh
  await connection();
  await ensureSeeded();
  await connectDb();

  const [settings, pages, posts, nav] = await Promise.all([
    SiteSettings.findOne({ key: "default" }).lean(),
    PageContent.find({ published: true }).lean(),
    BlogPost.find({ published: true }).sort({ publishedAt: -1 }).lean(),
    NavItem.find({ visible: true }).sort({ order: 1 }).lean(),
  ]);

  const normalizedPages = (pages || []).map((page) => {
    const sections =
      page.sections instanceof Map
        ? Object.fromEntries(page.sections)
        : page.sections || {};
    return {
      ...page,
      sections,
    };
  });

  return {
    settings: settings ? JSON.parse(JSON.stringify(settings)) : null,
    pages: JSON.parse(JSON.stringify(normalizedPages)),
    posts: JSON.parse(JSON.stringify(posts || [])),
    nav: JSON.parse(JSON.stringify(nav || [])),
  };
}

export function getPageSection(
  pages: Array<{
    slug: string;
    sections?: Record<string, Record<string, string>>;
  }>,
  slug: string,
  section: string
) {
  const page = pages.find((p) => p.slug === slug);
  const sections = page?.sections || {};
  return (sections[section] || {}) as Record<string, string>;
}
