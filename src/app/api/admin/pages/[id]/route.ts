import { z } from "zod";
import { connectDb } from "@/lib/db";
import { PageContent } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";
import { revalidateCms } from "@/lib/cms-cache";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);
    await connectDb();
    const { id } = await params;
    const page = await PageContent.findById(id).lean();
    if (!page) return jsonError("Page not found", 404);
    return jsonOk({ page });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load page", 500);
  }
}

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  sections: z.record(z.string(), z.any()).optional(),
  published: z.boolean().optional(),
});

export async function PUT(request: Request, { params }: Params) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    const body = updateSchema.parse(await request.json());
    await connectDb();
    const { id } = await params;

    const page = await PageContent.findByIdAndUpdate(
      id,
      { $set: body },
      { returnDocument: "after" }
    ).lean();

    if (!page) return jsonError("Page not found", 404);
    revalidateCms();
    return jsonOk({ page, live: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message || "Invalid payload");
    }
    console.error(error);
    return jsonError("Failed to update page", 500);
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);
    await connectDb();
    const { id } = await params;
    const deleted = await PageContent.findByIdAndDelete(id);
    if (!deleted) return jsonError("Page not found", 404);
    revalidateCms();
    return jsonOk({ ok: true, live: true });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to delete page", 500);
  }
}
