import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  Compass,
  HeartPulse,
  MountainSnow,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import {
  ContentBlock,
  InfoCardGrid,
  SplitCta,
} from "@/components/PageSections";

export const metadata: Metadata = {
  title: "Services | Sirhan",
  description:
    "Psychological support, career counseling, educational courses, and wellbeing travel retreats.",
};

const services = [
  {
    title: "Psychological Support",
    description:
      "Assessment, counseling, and guidance with clear boundaries, confidentiality, and care.",
    icon: HeartPulse,
    href: "/services/psychological-support",
    tone: "bg-sage-soft/80",
  },
  {
    title: "Career Counseling",
    description:
      "Career assessment, academic guidance, and one-to-one planning for students and professionals.",
    icon: BriefcaseBusiness,
    href: "/services/career-counseling",
    tone: "bg-clay-soft/70",
  },
  {
    title: "Educational Courses",
    description:
      "Structured learning in psychology, personal development, and wellbeing — online or in person.",
    icon: Compass,
    href: "/services/educational-courses",
    tone: "bg-[#f3eee6]",
  },
  {
    title: "Travel Retreats",
    description:
      "Wellbeing-focused travel experiences combining reflection, rest, nature, and connection.",
    icon: MountainSnow,
    href: "/services/travel-retreats",
    tone: "bg-sage-soft/80",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Support designed for real life"
        description="From one-to-one psychological care to courses, career guidance, and retreats — explore the Sirhan offerings and find what fits your season."
        ctas={[
          { label: "Book a Session", href: "/book", variant: "accent" },
          { label: "View Workshops", href: "/workshops", variant: "ghost" },
        ]}
      />
      <ContentBlock>
        <InfoCardGrid cards={services} />
      </ContentBlock>
      <SplitCta
        title="Need help choosing a service?"
        description="Tell us a little about what you are looking for and we will guide you."
        primary={{ label: "Book Support", href: "/book" }}
        secondary={{ label: "About Sirhan", href: "/about" }}
      />
    </>
  );
}
