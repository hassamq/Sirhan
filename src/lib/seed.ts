import { connectDb } from "@/lib/db";
import {
  AdminUser,
  BlogPost,
  NavItem,
  PageContent,
  SiteSettings,
} from "@/lib/models";
import { hashPassword } from "@/lib/auth";

const defaultPages = [
  {
    slug: "home",
    title: "Home",
    sections: {
      hero: {
        eyebrow: "Your space for wellbeing & growth",
        title: "Wellness Support for Mind, Life & Community",
        description:
          "Practical psychological support, guidance, and resources to help you navigate life with clarity — for individuals, families, students, and organisations.",
        primaryCta: "Explore Wellness",
        secondaryCta: "Book Support",
        tertiaryCta: "Free Resources",
      },
      quote: {
        script: "A healthier mind creates a kinder world.",
        body: "We believe that small steps towards wellbeing today can create a healthier, kinder tomorrow.",
      },
      support: {
        title: "How can Sirhan support you?",
        description:
          "Choose a path that fits where you are — we meet you with care, not judgment.",
      },
    },
  },
  {
    slug: "about",
    title: "About Sirhan",
    sections: {
      hero: {
        eyebrow: "About Sirhan",
        title: "Better minds. Stronger communities.",
        description:
          "Sirhan Center for Well-Being makes psychological support, career guidance, learning opportunities, and meaningful experiences more accessible.",
        primaryCta: "Explore Services",
        secondaryCta: "Book a Session",
      },
      body: {
        title: "What guides our work",
        paragraph1:
          "We believe mental wellbeing is a foundation, not a luxury. Sirhan was created so students, parents, professionals, and communities can find clear pathways to support — without clinical coldness or overwhelm.",
        paragraph2:
          "Our approach blends evidence-informed practice with warmth: honest conversations, practical tools, and spaces to learn, heal, and grow together.",
      },
    },
  },
  {
    slug: "explore-wellness",
    title: "Explore Wellness",
    sections: {
      hero: {
        eyebrow: "Explore Wellness",
        title: "How can Sirhan support you?",
        description:
          "Choose a path that fits where you are — we meet you with care, not judgment. Each pathway leads to practical support, tools, and people who understand.",
        primaryCta: "Book Support",
        secondaryCta: "Free Resources",
      },
    },
  },
  {
    slug: "services",
    title: "Services",
    sections: {
      hero: {
        eyebrow: "Services",
        title: "Support designed for real life",
        description:
          "From one-to-one psychological care to courses, career guidance, and retreats — explore the Sirhan offerings and find what fits your season.",
        primaryCta: "Book a Session",
        secondaryCta: "View Workshops",
      },
    },
  },
  {
    slug: "resources",
    title: "Resources",
    sections: {
      hero: {
        eyebrow: "Resources",
        title: "Free tools for everyday wellbeing",
        description:
          "Small practices you can use today — track how you feel, settle your nervous system, and build kinder habits over time.",
        primaryCta: "Read Blogs",
        secondaryCta: "Book Support",
      },
    },
  },
  {
    slug: "workshops",
    title: "Workshops",
    sections: {
      hero: {
        eyebrow: "Workshops & Events",
        title: "Upcoming Workshops & Events",
        description:
          "Live sessions, retreats, and learning spaces designed for reflection, skill-building, and connection.",
        primaryCta: "Register Interest",
        secondaryCta: "Travel Retreats",
      },
    },
  },
  {
    slug: "organisations",
    title: "For Organisations",
    sections: {
      hero: {
        eyebrow: "For Organisations",
        title: "Healthier cultures for teams and communities",
        description:
          "Sirhan partners with schools, workplaces, and community groups to design wellbeing programmes that are practical, respectful, and psychologically safe.",
        primaryCta: "Request a Consultation",
        secondaryCta: "View Services",
      },
    },
  },
  {
    slug: "book",
    title: "Book Support",
    sections: {
      hero: {
        eyebrow: "Book Support",
        title: "Request a session or registration",
        description:
          "Share a few details and the Sirhan team will follow up about availability, format, and next steps. This form does not collect payment.",
      },
    },
  },
];

const defaultNav = [
  { label: "Home", href: "/", order: 0 },
  { label: "About Sirhan", href: "/about", order: 1 },
  { label: "Explore Wellness", href: "/explore-wellness", order: 2 },
  { label: "Services", href: "/services", order: 3 },
  { label: "Resources", href: "/resources", order: 4 },
  { label: "Workshops", href: "/workshops", order: 5 },
  { label: "For Organisations", href: "/organisations", order: 6 },
];

export async function ensureSeeded() {
  await connectDb();

  const email = (process.env.ADMIN_EMAIL || "admin@sirhan.care").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const existingAdmin = await AdminUser.findOne({ email });
  if (!existingAdmin) {
    await AdminUser.create({
      email,
      name: "Sirhan Admin",
      passwordHash: await hashPassword(password),
    });
  }

  const settings = await SiteSettings.findOne({ key: "default" });
  if (!settings) {
    await SiteSettings.create({ key: "default" });
  }

  for (const page of defaultPages) {
    const exists = await PageContent.findOne({ slug: page.slug });
    if (!exists) {
      await PageContent.create(page);
    }
  }

  const navCount = await NavItem.countDocuments();
  if (navCount === 0) {
    await NavItem.insertMany(defaultNav);
  }

  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    try {
      await BlogPost.create({
        title: "Small steps toward calmer days",
        slug: "small-steps-toward-calmer-days",
        excerpt:
          "A gentle introduction to everyday wellbeing habits you can begin this week.",
        content:
          "## Start where you are\n\nWellbeing does not require a perfect routine. Begin with one breath, one boundary, or one honest conversation.\n\n## Keep it kind\n\nProgress is rarely linear. Sirhan is here for the quieter seasons too.",
        category: "Wellbeing",
        tags: ["habits", "stress", "self-care"],
        published: true,
        publishedAt: new Date(),
        coverImage: "/calm.jpg",
        author: "Sirhan Team",
      });
    } catch {
      // ignore duplicate key races
    }
  }

  return { ok: true };
}
