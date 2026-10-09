import { z } from "zod";
import { connectDb } from "@/lib/db";
import { BlogPost } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk, slugify } from "@/lib/api";
import { revalidateCms } from "@/lib/cms-cache";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  try {
    const admin = await requireAdmin(_request);
    if (!admin) return jsonError("Unauthorized", 401);

    await connectDb();
    const { id } = await params;
    const post = await BlogPost.findById(id).lean();
    if (!post) return jsonError("Post not found", 404);
    return jsonOk({ post });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load post", 500);
  }
}

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  author: z.string().optional(),
});

export async function PUT(request: Request, { params }: Params) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    const body = updateSchema.parse(await request.json());
    await connectDb();
    const { id } = await params;

    const existing = await BlogPost.findById(id);
    if (!existing) return jsonError("Post not found", 404);

    if (body.title && !body.slug) {
      body.slug = slugify(body.title);
    }

    if (body.published === true && !existing.publishedAt) {
      existing.publishedAt = new Date();
    }

    Object.assign(existing, body);
    await existing.save();

    revalidateCms();
    return jsonOk({ post: existing, live: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message || "Invalid payload");
    }
    console.error(error);
    return jsonError("Failed to update post", 500);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    await connectDb();
    const { id } = await params;
    const deleted = await BlogPost.findByIdAndDelete(id);
    if (!deleted) return jsonError("Post not found", 404);
    revalidateCms();
    return jsonOk({ ok: true, live: true });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to delete post", 500);
  }
}
