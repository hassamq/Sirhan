"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { usePageSection } from "@/components/SiteProvider";

export function WorkshopsQuote() {
  const quote = usePageSection("home", "quote");

  return (
    <section id="workshops" className="pb-16 sm:pb-20">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-2 lg:gap-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex min-h-[220px] flex-col justify-between rounded-2xl bg-clay-soft px-7 py-8 sm:px-9"
        >
          <div>
            <span className="mb-4 inline-flex text-clay">
              <CalendarDays className="h-7 w-7" strokeWidth={1.4} />
            </span>
            <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
              Upcoming Workshops & Events
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Live sessions, retreats, and learning spaces designed for reflection
              and connection.
            </p>
          </div>
          <Link href="/workshops" className="link-arrow mt-8">
            View all workshops
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl bg-navy px-8 py-10 text-center sm:px-12"
        >
          <svg
            aria-hidden
            viewBox="0 0 80 96"
            className="pointer-events-none absolute -right-2 -top-4 h-28 w-auto text-sage/20"
            fill="currentColor"
          >
            <path d="M40 8c12 18 28 28 28 48 0 16-12 28-28 28S12 72 12 56c0-20 16-30 28-48z" />
          </svg>
          <p className="relative font-display text-2xl font-medium leading-snug text-ivory sm:text-[1.75rem]">
            <span className="font-script block text-[1.65rem] text-sage sm:text-3xl">
              {quote.script || "A healthier mind creates a kinder world."}
            </span>
            <span className="mt-4 block text-[1.15rem] font-normal text-ivory/85 sm:text-xl">
              {quote.body ||
                "We believe that small steps towards wellbeing today can create a healthier, kinder tomorrow."}
            </span>
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
