import { z } from "zod";
import { connectDb } from "@/lib/db";
import { PageContent } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { jsonError, jsonOk } from "@/lib/api";

export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    await ensureSeeded();
    await connectDb();
    const pages = await PageContent.find().sort({ slug: 1 }).lean();
    const normalized = pages.map((page) => ({
      ...page,
      sections:
        page.sections instanceof Map
          ? Object.fromEntries(page.sections)
          : page.sections || {},
    }));
    return jsonOk({ pages: normalized });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load pages", 500);
  }
}

const pageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  sections: z.record(z.string(), z.any()).optional(),
  published: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    const body = pageSchema.parse(await request.json());
    await connectDb();

    const exists = await PageContent.findOne({ slug: body.slug });
    if (exists) return jsonError("Page slug already exists", 409);

    const page = await PageContent.create(body);
    return jsonOk({ page }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message || "Invalid payload");
    }
    console.error(error);
    return jsonError("Failed to create page", 500);
  }
}
