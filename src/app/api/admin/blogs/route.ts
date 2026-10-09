import { z } from "zod";
import { connectDb } from "@/lib/db";
import { BlogPost } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk, slugify } from "@/lib/api";
import { revalidateCms } from "@/lib/cms-cache";

export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    await connectDb();
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    const filter =
      published === "true"
        ? { published: true }
        : published === "false"
          ? { published: false }
          : {};

    const posts = await BlogPost.find(filter).sort({ updatedAt: -1 }).lean();
    return jsonOk({ posts });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load posts", 500);
  }
}

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  author: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    const body = postSchema.parse(await request.json());
    await connectDb();

    const slug = body.slug?.trim() || slugify(body.title);
    const existing = await BlogPost.findOne({ slug });
    if (existing) return jsonError("Slug already exists", 409);

    const post = await BlogPost.create({
      ...body,
      slug,
      publishedAt: body.published ? new Date() : undefined,
    });

    revalidateCms();
    return jsonOk({ post, live: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message || "Invalid payload");
    }
    console.error(error);
    return jsonError("Failed to create post", 500);
  }
}
