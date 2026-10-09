import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import {
  ContentBlock,
  SplitCta,
} from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Personal Wellbeing | Sirhan",
};

export default function PersonalWellbeingPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore Wellness"
        title="Personal Wellbeing"
        description="Build sustainable habits for rest, focus, relationships, and a calmer daily rhythm — with guidance that fits real life."
        ctas={[
          { label: "Book Support", href: "/book", variant: "accent" },
          { label: "Free Tools", href: "/resources#tools", variant: "ghost" },
        ]}
      />
      <ContentBlock title="What this can include">
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            "Daily stress and overwhelm",
            "Sleep, energy, and self-care routines",
            "Boundaries and life transitions",
            "Motivation and personal goals",
          ].map((item) => (
            <li
              key={item}
              className="rounded-2xl bg-[#f3eee6] px-5 py-4 text-sm text-stone"
            >
              {item}
            </li>
          ))}
        </ul>
      </ContentBlock>
      <SplitCta
        title="Start with one small step"
        description="A single session or a free tool can help you find direction."
        primary={{ label: "Book a Session", href: "/book" }}
        secondary={{ label: "Back to Wellness", href: "/explore-wellness" }}
      />
    </>
  );
}
