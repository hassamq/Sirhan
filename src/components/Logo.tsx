"use client";

import Image from "next/image";
import Link from "next/link";
import { useSite } from "@/components/SiteProvider";

export function Logo({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const { settings } = useSite();
  const brand = settings?.brandName || "Sirhan";
  const tagline = settings?.tagline || "Mind · Body · Balance";
  const logoSrc = settings?.images?.logo || "/logo-mark.svg";

  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center text-sage-deep transition-colors group-hover:text-navy">
        <Image
          src={logoSrc}
          alt=""
          width={40}
          height={48}
          className="h-10 w-auto"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-semibold tracking-tight text-navy">
          {brand}
        </span>
        {!compact && (
          <span className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted">
            {tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
