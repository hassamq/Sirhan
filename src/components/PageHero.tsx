"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "accent" | "ghost" | "outline";
};

export function PageHero({
  eyebrow,
  title,
  description,
  ctas = [],
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctas?: Cta[];
}) {
  const variantClass = {
    primary: "btn-primary",
    accent: "btn-accent",
    ghost: "btn-ghost",
    outline: "btn-outline",
  } as const;

  return (
    <section className="relative overflow-hidden border-b border-line/60">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sage-soft/45 via-transparent to-clay-soft/25" />
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-sage-deep">
            {eyebrow}
          </p>
          <h1 className="section-title text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
            {description}
          </p>
          {ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctas.map((cta) => (
                <Link
                  key={cta.label}
                  href={cta.href}
                  className={`btn ${variantClass[cta.variant ?? "primary"]}`}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
