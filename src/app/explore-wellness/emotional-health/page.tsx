import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentBlock, SplitCta } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Emotional Health | Sirhan",
};

export default function EmotionalHealthPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore Wellness"
        title="Emotional Health"
        description="Understand your feelings with clarity and learn practical skills for anxiety, stress, mood, and emotional regulation."
        ctas={[
          { label: "Book Support", href: "/book", variant: "accent" },
          {
            label: "Psychological Services",
            href: "/services/psychological-support",
            variant: "outline",
          },
        ]}
      />
      <ContentBlock title="Support often focuses on">
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            "Anxiety and worry cycles",
            "Low mood and emotional fatigue",
            "Stress management skills",
            "Building emotional resilience",
          ].map((item) => (
            <li
              key={item}
              className="rounded-2xl bg-clay-soft/70 px-5 py-4 text-sm text-stone"
            >
              {item}
            </li>
          ))}
        </ul>
      </ContentBlock>
      <SplitCta
        title="You do not have to figure it out alone"
        description="Confidential support is available when you are ready."
        primary={{ label: "Book Support", href: "/book" }}
        secondary={{ label: "Explore Resources", href: "/resources" }}
      />
    </>
  );
}
