import type { Metadata } from "next";
import {
  Brain,
  Flower2,
  GraduationCap,
  HeartHandshake,
  Sparkles,
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
  title: "About Sirhan | Center for Well-Being",
  description:
    "Learn about Sirhan — a calm, accessible space for psychological support, learning, and community wellbeing.",
};

export default async function AboutPage() {
  const site = await getSiteData();
  const hero = getPageSection(site.pages, "about", "hero");
  const body = getPageSection(site.pages, "about", "body");

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow || "About Sirhan"}
        title={hero.title || "Better minds. Stronger communities."}
        description={
          hero.description ||
          "Sirhan Center for Well-Being makes psychological support, career guidance, learning opportunities, and meaningful experiences more accessible."
        }
        ctas={[
          {
            label: hero.primaryCta || "Explore Services",
            href: "/services",
            variant: "primary",
          },
          {
            label: hero.secondaryCta || "Book a Session",
            href: "/book",
            variant: "accent",
          },
        ]}
      />

      <ContentBlock title={body.title || "What guides our work"}>
        <div className="grid gap-6 lg:grid-cols-2">
          <p className="text-[1.05rem] leading-relaxed text-muted">
            {body.paragraph1 ||
              "We believe mental wellbeing is a foundation, not a luxury. Sirhan was created so students, parents, professionals, and communities can find clear pathways to support — without clinical coldness or overwhelm."}
          </p>
          <p className="text-[1.05rem] leading-relaxed text-muted">
            {body.paragraph2 ||
              "Our approach blends evidence-informed practice with warmth: honest conversations, practical tools, and spaces to learn, heal, and grow together."}
          </p>
        </div>
      </ContentBlock>

      <ContentBlock title="Our pillars">
        <InfoCardGrid
          cards={[
            {
              title: "Support",
              description:
                "Confidential psychological services and guidance for individuals, families, and young people.",
              icon: HeartHandshake,
              tone: "bg-sage-soft/80",
            },
            {
              title: "Educate",
              description:
                "Courses, workshops, and resources that build mental health literacy and life skills.",
              icon: Sparkles,
              tone: "bg-clay-soft/70",
            },
            {
              title: "Empower",
              description:
                "Career counseling, retreats, and community programmes that help people move forward with clarity.",
              icon: Users,
              tone: "bg-[#f3eee6]",
            },
          ]}
        />
      </ContentBlock>

      <ContentBlock title="Who we walk with">
        <InfoCardGrid
          cards={[
            {
              title: "Individuals & families",
              description:
                "Personal wellbeing, emotional health, and parenting support.",
              icon: Brain,
              href: "/explore-wellness",
            },
            {
              title: "Students & young adults",
              description:
                "Academic pressure, identity, motivation, and career direction.",
              icon: GraduationCap,
              href: "/explore-wellness/student-life",
              tone: "bg-clay-soft/70",
            },
            {
              title: "Teams & organisations",
              description:
                "Workplace wellbeing programmes and healthier team cultures.",
              icon: Flower2,
              href: "/organisations",
              tone: "bg-sage-soft/80",
            },
          ]}
        />
      </ContentBlock>

      <SplitCta
        title="Ready to take a gentle next step?"
        description="Whether you need a conversation, a course, or organisational support — we are here."
        primary={{ label: "Book Support", href: "/book" }}
        secondary={{ label: "Contact Us", href: "/about" }}
      />
    </>
  );
}
