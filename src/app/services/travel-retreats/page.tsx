import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentBlock, SplitCta } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Travel Retreats | Sirhan",
};

export default function TravelRetreatsPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Travel Retreats"
        description="Wellbeing-focused travel experiences that combine nature, reflection, recreation, social connection, and mental wellness."
        ctas={[
          { label: "View Workshops", href: "/workshops", variant: "primary" },
          { label: "Register Interest", href: "/book", variant: "accent" },
        ]}
      />
      <ContentBlock title="Each retreat may include">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Destination, dates, and duration",
            "Activities and inclusions",
            "Reflection and stress-management sessions",
            "Rest and nature time",
            "Fees and registration details",
            "Photo gallery and FAQs",
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
        title="Upcoming retreat details coming soon"
        description="Register your interest to hear about destinations and dates first."
        primary={{ label: "Register Interest", href: "/book" }}
        secondary={{ label: "All Services", href: "/services" }}
      />
    </>
  );
}
