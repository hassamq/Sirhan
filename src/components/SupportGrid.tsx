"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Flower2,
  Baby,
  Users,
  GraduationCap,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { usePageSection } from "@/components/SiteProvider";

type Card = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
  href: string;
};

const cards: Card[] = [
  {
    title: "Personal Wellbeing",
    description:
      "Build habits and routines that support a calmer, more balanced everyday life.",
    icon: Brain,
    tone: "bg-[#f3eee6]",
    href: "/explore-wellness/personal-wellbeing",
  },
  {
    title: "Emotional Health",
    description:
      "Understand feelings with clarity and learn skills for stress, anxiety, and mood.",
    icon: Flower2,
    tone: "bg-clay-soft/70",
    href: "/explore-wellness/emotional-health",
  },
  {
    title: "Child & Teen Support",
    description:
      "Age-sensitive guidance for younger minds navigating growth, school, and emotions.",
    icon: Baby,
    tone: "bg-sage-soft/80",
    href: "/services/psychological-support",
  },
  {
    title: "Family & Parenting",
    description:
      "Strengthen connection at home with practical tools for parents and caregivers.",
    icon: Users,
    tone: "bg-[#f3eee6]",
    href: "/services/psychological-support",
  },
  {
    title: "Student Wellbeing",
    description:
      "Support for academic pressure, identity, motivation, and healthy study rhythms.",
    icon: GraduationCap,
    tone: "bg-clay-soft/70",
    href: "/explore-wellness/student-life",
  },
  {
    title: "Workplace & Community",
    description:
      "Programmes that help teams and communities grow healthier cultures together.",
    icon: Building2,
    tone: "bg-sage-soft/80",
    href: "/organisations",
  },
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function SupportGrid() {
  const support = usePageSection("home", "support");

  return (
    <section id="support" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="section-title text-3xl sm:text-4xl">
            {support.title || "How can Sirhan support you?"}
          </h2>
          <p className="mt-3 text-muted">
            {support.description ||
              "Choose a path that fits where you are — we meet you with care, not judgment."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                className={`group rounded-2xl ${card.tone} p-6 transition duration-300 hover:-translate-y-1`}
              >
                <Link href={card.href} className="block outline-none">
                  <span className="mb-5 inline-flex text-sage-deep">
                    <Icon className="h-7 w-7" strokeWidth={1.35} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-navy">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {card.description}
                  </p>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
