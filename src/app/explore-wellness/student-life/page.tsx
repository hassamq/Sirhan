import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentBlock, SplitCta } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Student Life | Sirhan",
};

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        eyebrow="Explore Wellness"
        title="Student Wellbeing"
        description="Support for academic pressure, identity, motivation, friendships, and healthy study rhythms — for school, college, and university life."
        ctas={[
          { label: "Book Support", href: "/book", variant: "accent" },
          {
            label: "Career Counseling",
            href: "/services/career-counseling",
            variant: "outline",
          },
        ]}
      />
      <ContentBlock title="Common student themes">
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            "Exam stress and performance anxiety",
            "Time management and focus",
            "Homesickness and belonging",
            "Career direction and academic choices",
          ].map((item) => (
            <li
              key={item}
              className="rounded-2xl bg-sage-soft/80 px-5 py-4 text-sm text-stone"
            >
              {item}
            </li>
          ))}
        </ul>
      </ContentBlock>
      <SplitCta
        title="Study with more steadiness"
        description="Combine wellbeing support with career clarity when you need both."
        primary={{ label: "Book a Session", href: "/book" }}
        secondary={{ label: "View Courses", href: "/services/educational-courses" }}
      />
    </>
  );
}
