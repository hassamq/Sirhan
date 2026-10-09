import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { connectDb } from "@/lib/db";
import { MediaAsset } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api";
import { revalidateCms } from "@/lib/cms-cache";

export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);
    await connectDb();
    const media = await MediaAsset.find().sort({ createdAt: -1 }).lean();
    return jsonOk({ media });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load media", 500);
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);

    const form = await request.formData();
    const file = form.get("file");
    const alt = String(form.get("alt") || "");

    if (!(file instanceof File)) {
      return jsonError("File is required");
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`;
    const diskPath = path.join(uploadsDir, safeName);
    await writeFile(diskPath, bytes);

    const url = `/uploads/${safeName}`;
    await connectDb();
    const asset = await MediaAsset.create({
      filename: file.name,
      url,
      alt,
      mimeType: file.type || "application/octet-stream",
      size: file.size,
    });

    revalidateCms();
    return jsonOk({ media: asset, live: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to upload media", 500);
  }
}
