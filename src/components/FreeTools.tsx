"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  CloudRain,
  HeartPulse,
  Mail,
  Moon,
  Smile,
  ArrowRight,
  Wind,
} from "lucide-react";

const tools = [
  { label: "Mood Tracker", icon: Smile },
  { label: "Stress Management", icon: CloudRain },
  { label: "Sleep Better", icon: Moon },
  { label: "Breathing Guide", icon: Wind },
  { label: "Journal Prompts", icon: BookOpen },
  { label: "Self-Care Plans", icon: HeartPulse },
];

export function FreeTools() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  }

  return (
    <section id="resources" className="py-6 sm:py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="section-title text-3xl sm:text-[2.15rem]">
            Free tools for everyday wellbeing
          </h2>
          <p className="mt-3 max-w-lg text-muted">
            Small practices you can use today — track how you feel, settle your
            nervous system, and build kinder habits over time.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tools.map(({ label, icon: Icon }) => (
              <Link
                key={label}
                href="/resources"
                className="flex flex-col items-center gap-3 rounded-xl border border-line bg-paper/70 px-3 py-5 text-center transition hover:border-sage/40 hover:bg-paper"
              >
                <span className="icon-circle">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-medium text-stone">{label}</span>
              </Link>
            ))}
          </div>

          <Link href="/resources" className="link-arrow mt-7">
            Explore all free resources
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="flex flex-col justify-center rounded-2xl bg-sage-soft/90 px-6 py-8 sm:px-8"
        >
          <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-paper text-sage-deep">
            <Mail className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h3 className="font-display text-2xl font-semibold text-navy">
            Stay inspired, stay connected
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Gentle reminders, free resources, and upcoming workshops — no noise,
            just care.
          </p>

          {done ? (
            <p className="mt-6 rounded-lg bg-paper/80 px-4 py-3 text-sm text-sage-deep">
              Thank you — you&apos;re on the list. We&apos;ll be in touch soon.
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 rounded-lg border border-transparent bg-paper px-4 text-sm text-navy outline-none ring-sage/30 placeholder:text-muted/70 focus:ring-2"
              />
              <button type="submit" className="btn btn-primary w-full">
                Join Now
              </button>
            </form>
          )}
        </motion.aside>
      </div>
    </section>
  );
}
