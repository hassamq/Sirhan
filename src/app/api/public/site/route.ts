import { connectDb } from "@/lib/db";
import { BlogPost, NavItem, PageContent, SiteSettings } from "@/lib/models";
import { ensureSeeded } from "@/lib/seed";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  try {
    await ensureSeeded();
    await connectDb();

    const [settings, pages, posts, nav] = await Promise.all([
      SiteSettings.findOne({ key: "default" }).lean(),
      PageContent.find({ published: true }).lean(),
      BlogPost.find({ published: true }).sort({ publishedAt: -1 }).lean(),
      NavItem.find({ visible: true }).sort({ order: 1 }).lean(),
    ]);

    return jsonOk({
      settings,
      pages,
      posts,
      nav,
    });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load public content", 500);
  }
}
