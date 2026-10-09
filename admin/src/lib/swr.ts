"use client";

import useSWR, { mutate as globalMutate } from "swr";
import { api } from "@/lib/api";

async function fetcher<T>(path: string): Promise<T> {
  return api<T>(path);
}

export function useAdminQuery<T>(path: string | null) {
  return useSWR<T>(path, fetcher, {
    revalidateOnFocus: true,
    dedupingInterval: 2000,
    keepPreviousData: true,
  });
}

export async function adminMutate<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {},
  invalidate: string[] = []
): Promise<T> {
  const result = await api<T>(path, options);
  await Promise.all([
    ...invalidate.map((key) => globalMutate(key)),
    globalMutate(path),
  ]);
  return result;
}

export function liveSavedToast(
  toast: { success: (msg: string) => void },
  message = "Saved and published to the live website"
) {
  toast.success(message);
}
