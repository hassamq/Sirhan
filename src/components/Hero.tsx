"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeartHandshake, LockKeyhole, Sparkles } from "lucide-react";
import { usePageSection, useSite } from "@/components/SiteProvider";

const trusts = [
  { icon: Sparkles, label: "Evidence Informed" },
  { icon: LockKeyhole, label: "Confidential" },
  { icon: HeartHandshake, label: "Compassionate" },
];

export function Hero() {
  const hero = usePageSection("home", "hero");
  const { settings } = useSite();
  const heroImage = settings?.images?.hero || "/calm.jpg";

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] bg-gradient-to-bl from-sage-soft/70 via-sage-soft/35 to-transparent lg:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-xl"
        >
          <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-sage-deep">
            {hero.eyebrow || "Your space for wellbeing & growth"}
          </p>
          <h1 className="section-title text-4xl sm:text-5xl lg:text-[3.35rem]">
            {hero.title || "Wellness Support for Mind, Life & Community"}
          </h1>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted">
            {hero.description ||
              "Practical psychological support, guidance, and resources to help you navigate life with clarity — for individuals, families, students, and organisations."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/explore-wellness" className="btn btn-primary">
              {hero.primaryCta || "Explore Wellness"}
            </Link>
            <Link href="/book" className="btn btn-accent">
              {hero.secondaryCta || "Book Support"}
            </Link>
            <Link href="/resources" className="btn btn-ghost">
              {hero.tertiaryCta || "Free Resources"}
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-7">
            {trusts.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm text-stone">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-sage-deep">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="absolute -inset-6 -z-10 rounded-[40%_60%_55%_45%] bg-sage-soft/50 blur-2xl lg:-inset-10" />
          <div className="hero-mask relative aspect-[4/5] overflow-hidden bg-ivory-deep lg:aspect-[5/6]">
            <Image
              src={heroImage}
              alt="Quiet moment of reflection and wellbeing"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="object-cover object-[center_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-sage/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
