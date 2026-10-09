import { ensureSeeded } from "@/lib/seed";
import { jsonOk, jsonError } from "@/lib/api";

export async function POST() {
  try {
    const result = await ensureSeeded();
    return jsonOk(result);
  } catch (error) {
    console.error(error);
    return jsonError("Failed to seed database", 500);
  }
}

export async function GET() {
  try {
    const result = await ensureSeeded();
    return jsonOk(result);
  } catch (error) {
    console.error(error);
    return jsonError("Failed to seed database", 500);
  }
}
