import { ensureSeeded } from "@/lib/seed";
import { jsonOk, jsonError } from "@/lib/api";

function mongoErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (/MONGODB_URI|ENOTFOUND|ECONNREFUSED|authentication failed|bad auth|MongoServerSelectionError|querySrv/i.test(message)) {
    return `MongoDB connection failed: ${message}`;
  }
  return message || "Failed to seed database";
}

export async function POST() {
  try {
    const result = await ensureSeeded();
    return jsonOk(result);
  } catch (error) {
    console.error(error);
    return jsonError(mongoErrorMessage(error), 500);
  }
}

export async function GET() {
  try {
    const result = await ensureSeeded();
    return jsonOk(result);
  } catch (error) {
    console.error(error);
    return jsonError(mongoErrorMessage(error), 500);
  }
}
