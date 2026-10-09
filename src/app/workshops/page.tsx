import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContentBlock, SplitCta } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Workshops | Sirhan",
  description:
    "Upcoming workshops, events, and live learning experiences with Sirhan.",
};

const events = [
  {
    title: "Stress Reset Evening",
    meta: "Online · 2 hours",
    body: "Practical tools for calming the nervous system after a demanding week.",
  },
  {
    title: "Parenting with Presence",
    meta: "In person · Lahore",
    body: "A reflective workshop for caregivers navigating connection and boundaries.",
  },
  {
    title: "Student Focus Studio",
    meta: "Hybrid · Monthly",
    body: "Study rhythms, motivation, and emotional steadiness for exam seasons.",
  },
];

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        eyebrow="Workshops & Events"
        title="Upcoming Workshops & Events"
        description="Live sessions, retreats, and learning spaces designed for reflection, skill-building, and connection."
        ctas={[
          { label: "Register Interest", href: "/book", variant: "accent" },
          { label: "Travel Retreats", href: "/services/travel-retreats", variant: "ghost" },
        ]}
      />

      <ContentBlock>
        <div className="grid gap-4 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.title}
              className="rounded-2xl bg-clay-soft px-6 py-7"
            >
              <CalendarDays className="mb-4 h-6 w-6 text-clay" strokeWidth={1.4} />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {event.meta}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-navy">
                {event.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {event.body}
              </p>
            </article>
          ))}
        </div>
        <blockquote className="mt-10 rounded-2xl bg-navy px-8 py-10 text-center">
          <p className="font-script text-3xl text-sage sm:text-4xl">
            A healthier mind creates a kinder world.
          </p>
          <p className="mx-auto mt-4 max-w-2xl font-display text-lg text-ivory/90 sm:text-xl">
            We believe that small steps towards wellbeing today can create a
            healthier, kinder tomorrow.
          </p>
        </blockquote>
      </ContentBlock>

      <SplitCta
        title="Want updates on new dates?"
        description="Register your interest and we will share schedules as they open."
        primary={{ label: "Register Interest", href: "/book" }}
        secondary={{ label: "Explore Courses", href: "/services/educational-courses" }}
      />
    </>
  );
}
