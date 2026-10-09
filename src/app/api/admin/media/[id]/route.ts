import { connectDb } from "@/lib/db";
import { MediaAsset } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";
import { revalidateCms } from "@/lib/cms-cache";
import { unlink } from "fs/promises";
import path from "path";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, { params }: Params) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    await connectDb();
    const { id } = await params;
    const asset = await MediaAsset.findByIdAndDelete(id);
    if (!asset) return jsonError("Media not found", 404);

    if (asset.url.startsWith("/uploads/")) {
      try {
        await unlink(path.join(process.cwd(), "public", asset.url));
      } catch {
        // file may already be gone
      }
    }

    revalidateCms();
    return jsonOk({ ok: true, live: true });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to delete media", 500);
  }
}
