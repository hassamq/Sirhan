import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CloudRain,
  HeartPulse,
  Mic,
  Moon,
  Newspaper,
  Smile,
  Wind,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import {
  ContentBlock,
  InfoCardGrid,
  SplitCta,
} from "@/components/PageSections";
import { getSiteData } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Resources | Sirhan",
  description:
    "Free wellbeing tools, articles, guides, and interviews from Sirhan Center for Well-Being.",
};

export default async function ResourcesPage() {
  let posts: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    category?: string;
  }> = [];

  try {
    const site = await getSiteData();
    posts = site.posts;
  } catch {
    posts = [];
  }

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Free tools for everyday wellbeing"
        description="Small practices you can use today — track how you feel, settle your nervous system, and build kinder habits over time."
        ctas={[
          { label: "Read Blogs", href: "/resources#blogs", variant: "primary" },
          { label: "Book Support", href: "/book", variant: "accent" },
        ]}
      />

      <ContentBlock title="Free tools">
        <div id="tools" />
        <InfoCardGrid
          cards={[
            { title: "Mood Tracker", description: "Notice patterns in how you feel across the week.", icon: Smile, tone: "bg-[#f3eee6]" },
            { title: "Stress Management", description: "Simple techniques for tense moments.", icon: CloudRain, tone: "bg-clay-soft/70" },
            { title: "Sleep Better", description: "Wind-down habits for more restorative rest.", icon: Moon, tone: "bg-sage-soft/80" },
            { title: "Breathing Guide", description: "Short breathwork to settle body and mind.", icon: Wind, tone: "bg-[#f3eee6]" },
            { title: "Journal Prompts", description: "Gentle questions for reflection and clarity.", icon: BookOpen, tone: "bg-clay-soft/70" },
            { title: "Self-Care Plans", description: "Build a realistic care routine you can keep.", icon: HeartPulse, tone: "bg-sage-soft/80" },
          ]}
        />
      </ContentBlock>

      <ContentBlock title="From the blog">
        <div id="blogs" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/resources/blog/${post.slug}`}
              className="rounded-2xl bg-[#f3eee6] p-6 transition hover:-translate-y-1"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {post.category || "Article"}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-navy">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="text-muted">Blog posts will appear here once published in admin.</p>
          )}
        </div>
      </ContentBlock>

      <ContentBlock title="Learn & explore">
        <div id="guides" />
        <div id="interviews" />
        <InfoCardGrid
          cards={[
            {
              title: "Articles & Guides",
              description:
                "Clear writing on stress, relationships, student life, and emotional health.",
              icon: Newspaper,
              href: "/resources#blogs",
            },
            {
              title: "Interviews",
              description:
                "Conversations with psychologists, educators, and career experts.",
              icon: Mic,
              href: "/resources#interviews",
              tone: "bg-clay-soft/70",
            },
            {
              title: "Workshops",
              description:
                "Live learning spaces for reflection, skill-building, and community.",
              icon: BookOpen,
              href: "/workshops",
              tone: "bg-sage-soft/80",
            },
          ]}
        />
      </ContentBlock>

      <SplitCta
        title="Prefer guided support?"
        description="Resources are a start — sessions and workshops go deeper."
        primary={{ label: "Book Support", href: "/book" }}
        secondary={{ label: "View Workshops", href: "/workshops" }}
      />
    </>
  );
}
