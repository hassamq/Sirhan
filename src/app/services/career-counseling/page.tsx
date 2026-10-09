import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentBlock, SplitCta } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Career Counseling | Sirhan",
};

export default function CareerCounselingPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Career Counseling"
        description="Career guidance for students, young adults, and professionals — from assessment and academic planning to one-to-one counseling."
        ctas={[
          { label: "Book a Consultation", href: "/book", variant: "accent" },
          { label: "Student Wellbeing", href: "/explore-wellness/student-life", variant: "ghost" },
        ]}
      />
      <ContentBlock title="How we can help">
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            "Career assessment and interest exploration",
            "Personality and strengths mapping",
            "University and programme guidance",
            "Career planning and transition support",
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
        title="Find clearer direction"
        description="Request a career counseling session and take the next step with confidence."
        primary={{ label: "Book Now", href: "/book" }}
        secondary={{ label: "All Services", href: "/services" }}
      />
    </>
  );
}
