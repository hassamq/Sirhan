import { z } from "zod";
import { connectDb } from "@/lib/db";
import { AdminUser } from "@/lib/models";
import {
  createAdminToken,
  setAdminCookie,
  clearAdminCookie,
  verifyPassword,
  requireAdmin,
} from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { jsonError, jsonOk } from "@/lib/api";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    await ensureSeeded();
    const body = loginSchema.parse(await request.json());
    await connectDb();

    const user = await AdminUser.findOne({ email: body.email.toLowerCase() });
    if (!user) return jsonError("Invalid email or password", 401);

    const valid = await verifyPassword(body.password, user.passwordHash);
    if (!valid) return jsonError("Invalid email or password", 401);

    const token = await createAdminToken({
      sub: String(user._id),
      email: user.email,
    });
    await setAdminCookie(token);

    return jsonOk({
      token,
      user: { id: String(user._id), email: user.email, name: user.name },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message || "Invalid payload");
    }
    console.error(error);
    return jsonError("Login failed", 500);
  }
}

export async function DELETE() {
  await clearAdminCookie();
  return jsonOk({ ok: true });
}

export async function GET(request: Request) {
  const session = await requireAdmin(request);
  if (!session) return jsonError("Unauthorized", 401);
  return jsonOk({ user: session });
}
