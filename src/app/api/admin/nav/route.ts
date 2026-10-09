import { z } from "zod";
import { connectDb } from "@/lib/db";
import { NavItem } from "@/lib/models";
import { requireAdmin } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { jsonError, jsonOk } from "@/lib/api";
import { revalidateCms } from "@/lib/cms-cache";

export async function GET(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);
    await ensureSeeded();
    await connectDb();
    const items = await NavItem.find().sort({ order: 1 }).lean();
    return jsonOk({ items });
  } catch (error) {
    console.error(error);
    return jsonError("Failed to load navigation", 500);
  }
}

const itemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  order: z.number().optional(),
  parentId: z.string().nullable().optional(),
  visible: z.boolean().optional(),
});

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);
    const body = itemSchema.parse(await request.json());
    await connectDb();
    const item = await NavItem.create(body);
    return jsonOk({ item }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message || "Invalid payload");
    }
    console.error(error);
    return jsonError("Failed to create nav item", 500);
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await requireAdmin(request);
    if (!admin) return jsonError("Unauthorized", 401);
    const body = z
      .object({
        items: z.array(
          z.object({
            id: z.string(),
            label: z.string().min(1),
            href: z.string().min(1),
            order: z.number(),
            visible: z.boolean().optional(),
          })
        ),
      })
      .parse(await request.json());

    await connectDb();
    await Promise.all(
      body.items.map((item) =>
        NavItem.findByIdAndUpdate(item.id, {
          label: item.label,
          href: item.href,
          order: item.order,
          visible: item.visible ?? true,
        })
      )
    );

    const items = await NavItem.find().sort({ order: 1 }).lean();
    revalidateCms();
    return jsonOk({ items, live: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.issues[0]?.message || "Invalid payload");
    }
    console.error(error);
    return jsonError("Failed to update navigation", 500);
  }
}
