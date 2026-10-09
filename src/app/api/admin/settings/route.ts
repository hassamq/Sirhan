import { connectDb } from "@/lib/db";
import { SiteSettings } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { jsonError, jsonOk } from "@/lib/api";
import { revalidateCms, sanitizeDoc } from "@/lib/cms-cache";

export async function GET() {
  try {
    await ensureSeeded();
    await connectDb();
    const settings = await SiteSettings.findOne({ key: "default" }).lean();
    return jsonOk({ settings });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load settings", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    await connectDb();
    const raw = await request.json();
    const body = sanitizeDoc(raw as Record<string, unknown>);

    const settings = await SiteSettings.findOneAndUpdate(
      { key: "default" },
      { $set: body },
      { returnDocument: "after", upsert: true }
    ).lean();

    revalidateCms();
    return jsonOk({ settings, live: true });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to update settings", 500);
  }
}
