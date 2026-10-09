import type { Metadata } from "next";
import {
  Baby,
  Brain,
  Building2,
  Flower2,
  GraduationCap,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import {
  ContentBlock,
  InfoCardGrid,
  SplitCta,
} from "@/components/PageSections";
import { getPageSection, getSiteData } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Explore Wellness | Sirhan",
  description:
    "Discover wellbeing pathways for personal growth, emotional health, families, students, and communities.",
};

const pathways = [
  {
    title: "Personal Wellbeing",
    description:
      "Build habits and routines that support a calmer, more balanced everyday life.",
    icon: Brain,
    href: "/explore-wellness/personal-wellbeing",
    tone: "bg-[#f3eee6]",
  },
  {
    title: "Emotional Health",
    description:
      "Understand feelings with clarity and learn skills for stress, anxiety, and mood.",
    icon: Flower2,
    href: "/explore-wellness/emotional-health",
    tone: "bg-clay-soft/70",
  },
  {
    title: "Child & Teen Support",
    description:
      "Age-sensitive guidance for younger minds navigating growth, school, and emotions.",
    icon: Baby,
    href: "/services/psychological-support",
    tone: "bg-sage-soft/80",
  },
  {
    title: "Family & Parenting",
    description:
      "Strengthen connection at home with practical tools for parents and caregivers.",
    icon: Users,
    href: "/services/psychological-support",
    tone: "bg-[#f3eee6]",
  },
  {
    title: "Student Wellbeing",
    description:
      "Support for academic pressure, identity, motivation, and healthy study rhythms.",
    icon: GraduationCap,
    href: "/explore-wellness/student-life",
    tone: "bg-clay-soft/70",
  },
  {
    title: "Workplace & Community",
    description:
      "Programmes that help teams and communities grow healthier cultures together.",
    icon: Building2,
    href: "/organisations",
    tone: "bg-sage-soft/80",
  },
];

export default async function ExploreWellnessPage() {
  const site = await getSiteData();
  const hero = getPageSection(site.pages, "explore-wellness", "hero");

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow || "Explore Wellness"}
        title={hero.title || "How can Sirhan support you?"}
        description={
          hero.description ||
          "Choose a path that fits where you are — we meet you with care, not judgment."
        }
        ctas={[
          {
            label: hero.primaryCta || "Book Support",
            href: "/book",
            variant: "accent",
          },
          {
            label: hero.secondaryCta || "Free Resources",
            href: "/resources",
            variant: "ghost",
          },
        ]}
      />

      <ContentBlock>
        <InfoCardGrid cards={pathways} />
      </ContentBlock>

      <SplitCta
        title="Not sure where to begin?"
        description="Start with a short conversation. We will help you find the right fit."
        primary={{ label: "Book a Consultation", href: "/book" }}
        secondary={{ label: "View Services", href: "/services" }}
      />
    </>
  );
}
