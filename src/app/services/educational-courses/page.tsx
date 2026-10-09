import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentBlock, SplitCta } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Educational Courses | Sirhan",
};

export default function EducationalCoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Educational Courses"
        description="Structured learning in psychology, mental health, personal development, and wellbeing — online, in-person, or hybrid."
        ctas={[
          { label: "Register Interest", href: "/book", variant: "accent" },
          { label: "Workshops", href: "/workshops", variant: "ghost" },
        ]}
      />
      <ContentBlock title="Course pages will include">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Learning objectives and target audience",
            "Instructor, duration, and schedule",
            "Fees, certificates, and registration",
          ].map((item) => (
            <article key={item} className="rounded-2xl bg-sage-soft/80 p-6">
              <p className="text-sm leading-relaxed text-stone">{item}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-muted">
          Featured course details will be added as the catalogue grows. For now,
          register your interest and we will share upcoming offerings.
        </p>
      </ContentBlock>
      <SplitCta
        title="Join the next learning cohort"
        description="Tell us what topics you care about and we will keep you informed."
        primary={{ label: "Register Interest", href: "/book" }}
      />
    </>
  );
}
