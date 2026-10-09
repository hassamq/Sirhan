"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BatteryLow,
  BookMarked,
  Briefcase,
  Flame,
  Heart,
  Home,
  School,
  UsersRound,
} from "lucide-react";

const topics = [
  { label: "Stress & Burnout", icon: Flame },
  { label: "Anxiety", icon: BatteryLow },
  { label: "Relationships", icon: Heart },
  { label: "Student Life", icon: School },
  { label: "Family", icon: Home },
  { label: "Work & Career", icon: Briefcase },
  { label: "Self-Esteem", icon: BookMarked },
  { label: "Community", icon: UsersRound },
];

export function ExploreTopics() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="section-title text-3xl sm:text-4xl">Explore by topic</h2>
          <p className="mt-3 text-muted">
            Find guidance that speaks to what you&apos;re carrying right now.
          </p>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-8 sm:gap-x-10">
          {topics.map(({ label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <Link
                href="/resources"
                className="group flex w-[5.5rem] flex-col items-center gap-3 text-center sm:w-24"
              >
                <span className="icon-circle transition group-hover:border-sage group-hover:bg-sage-soft/60">
                  <Icon className="h-5 w-5" strokeWidth={1.45} />
                </span>
                <span className="text-[0.78rem] font-medium leading-snug text-stone group-hover:text-navy">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/resources" className="link-arrow">
            Browse all topics
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
