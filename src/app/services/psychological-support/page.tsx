import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContentBlock, SplitCta } from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Psychological Support | Sirhan",
};

export default function PsychologicalSupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Psychological Support"
        description="Confidential counseling and psychological guidance for individuals, parents, children, and teens — delivered with professional care and clear boundaries."
        ctas={[
          { label: "Book a Session", href: "/book", variant: "accent" },
          { label: "All Services", href: "/services", variant: "ghost" },
        ]}
      />
      <ContentBlock title="What to expect">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Who it is for",
              body: "Adults, students, parents, children, and teens seeking emotional or behavioural support.",
            },
            {
              title: "Format",
              body: "One-to-one sessions online or in person, with clear session goals and follow-up where helpful.",
            },
            {
              title: "Confidentiality",
              body: "Your privacy is protected within professional and legal limits. Emergencies should contact local emergency services.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl bg-[#f3eee6] p-6"
            >
              <h3 className="font-display text-xl font-semibold text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </ContentBlock>
      <SplitCta
        title="Begin with a booking request"
        description="Share what you need and we will follow up with availability and next steps."
        primary={{ label: "Book Support", href: "/book" }}
      />
    </>
  );
}
