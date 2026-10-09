import { connectDb } from "@/lib/db";
import { BlogPost } from "@/lib/models";
import { ensureSeeded } from "@/lib/seed";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET(request: Request) {
  try {
    await ensureSeeded();
    await connectDb();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await BlogPost.findOne({ slug, published: true }).lean();
      if (!post) return jsonError("Post not found", 404);
      return jsonOk({ post });
    }

    const posts = await BlogPost.find({ published: true })
      .sort({ publishedAt: -1 })
      .lean();
    return jsonOk({ posts });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load blogs", 500);
  }
}
