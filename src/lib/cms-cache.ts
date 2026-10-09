import { revalidatePath, revalidateTag } from "next/cache";

export const CMS_TAG = "cms-site";

/** Call after any admin mutation so the public site refreshes immediately. */
export function revalidateCms() {
  revalidateTag(CMS_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  [
    "/",
    "/about",
    "/explore-wellness",
    "/services",
    "/resources",
    "/workshops",
    "/organisations",
    "/book",
    "/login",
  ].forEach((path) => revalidatePath(path));
}

export function sanitizeDoc<T extends Record<string, unknown>>(doc: T): Partial<T> {
  const clone = { ...doc };
  delete clone._id;
  delete clone.__v;
  delete clone.createdAt;
  delete clone.updatedAt;
  delete clone.key;
  return clone;
}
