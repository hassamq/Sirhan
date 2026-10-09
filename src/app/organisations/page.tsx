import type { Metadata } from "next";
import { Building2, HeartHandshake, UsersRound } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import {
  ContentBlock,
  InfoCardGrid,
  SplitCta,
} from "@/components/PageSections";

export const metadata: Metadata = {
  title: "For Organisations | Sirhan",
  description:
    "Workplace and community wellbeing programmes for teams, schools, and organisations.",
};

export default function OrganisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="For Organisations"
        title="Healthier cultures for teams and communities"
        description="Sirhan partners with schools, workplaces, and community groups to design wellbeing programmes that are practical, respectful, and psychologically safe."
        ctas={[
          { label: "Request a Consultation", href: "/book", variant: "accent" },
          { label: "View Services", href: "/services", variant: "ghost" },
        ]}
      />

      <ContentBlock title="How we support organisations">
        <InfoCardGrid
          cards={[
            {
              title: "Workplace wellbeing",
              description:
                "Sessions on stress, burnout, communication, and team resilience.",
              icon: Building2,
              tone: "bg-sage-soft/80",
            },
            {
              title: "School & campus programmes",
              description:
                "Student and staff wellbeing initiatives tailored to your community.",
              icon: UsersRound,
              tone: "bg-clay-soft/70",
            },
            {
              title: "Custom workshops",
              description:
                "Facilitated experiences designed around your organisation’s needs.",
              icon: HeartHandshake,
              tone: "bg-[#f3eee6]",
            },
          ]}
        />
      </ContentBlock>

      <SplitCta
        title="Let’s design something that fits your people"
        description="Share your goals and we will propose a thoughtful programme outline."
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "About Sirhan", href: "/about" }}
      />
    </>
  );
}
