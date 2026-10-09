"use client";

import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { useSite } from "@/components/SiteProvider";

const quick = [
  { label: "Home", href: "/" },
  { label: "About Sirhan", href: "/about" },
  { label: "Explore Wellness", href: "/explore-wellness" },
  { label: "Workshops", href: "/workshops" },
  { label: "For Organisations", href: "/organisations" },
];

const resources = [
  { label: "Articles", href: "/resources" },
  { label: "Free Tools", href: "/resources#tools" },
  { label: "Guides", href: "/resources#guides" },
  { label: "Interviews", href: "/resources#interviews" },
];

const services = [
  { label: "Psychological Support", href: "/services/psychological-support" },
  { label: "Career Counseling", href: "/services/career-counseling" },
  { label: "Educational Courses", href: "/services/educational-courses" },
  { label: "Travel Retreats", href: "/services/travel-retreats" },
];

function SocialIcon({ name }: { name: "instagram" | "facebook" | "youtube" | "linkedin" }) {
  const common = {
    className: "h-4 w-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  if (name === "instagram") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg {...common}>
        <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.2l.8-3H14V9z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg {...common}>
        <rect x="2.5" y="6" width="19" height="12" rx="3" />
        <path d="M10.5 9.5v5l5-2.5-5-2.5z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="6" cy="9" r="2" />
      <circle cx="6" cy="16" r="2" />
      <circle cx="16.5" cy="8" r="2.2" />
      <path d="M8 9.5c1.8 0 3.2 1 4 2.5M8 15c2 .2 3.5-.5 5-2M14.5 9.8c.4 1.2.4 2.5 0 3.7" />
    </svg>
  );
}

const social = [
  { label: "Instagram", href: "#", name: "instagram" as const },
  { label: "Facebook", href: "#", name: "facebook" as const },
  { label: "YouTube", href: "#", name: "youtube" as const },
  { label: "LinkedIn", href: "#", name: "linkedin" as const },
];

export function Footer() {
  const { settings } = useSite();
  const contact = settings?.contact;
  const socialLinks = settings?.social || {};
  const brand = settings?.brandName || "Sirhan";

  return (
    <footer className="border-t border-line bg-ivory-deep/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            {settings?.siteDescription ||
              "Sirhan Center for Well-Being makes psychological support, learning, and meaningful growth more accessible — for individuals, families, students, and communities."}
          </p>
          <div className="mt-5 flex gap-3">
            {social.map(({ label, name }) => (
              <Link
                key={label}
                href={socialLinks[name] || "#"}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-stone transition hover:border-sage hover:text-sage-deep"
              >
                <SocialIcon name={name} />
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-navy">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {quick.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition hover:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold text-navy">Resources</h3>
          <ul className="mt-4 space-y-2.5">
            {resources.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition hover:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="mt-7 text-sm font-semibold text-navy">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {services.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-muted transition hover:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-sm font-semibold text-navy">Contact Us</h3>
          <ul className="mt-4 space-y-3.5 text-sm text-muted">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
              <span>{contact?.phone || "+92 300 0000000"}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
              <a
                href={`mailto:${contact?.email || "hello@sirhan.care"}`}
                className="hover:text-navy"
              >
                {contact?.email || "hello@sirhan.care"}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
              <span>{contact?.location || "Lahore, Pakistan"}</span>
            </li>
            <li className="flex gap-3">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" />
              <span className="whitespace-pre-line">
                {contact?.hours ||
                  "Mon–Fri · 10:00 AM – 6:00 PM\nSat · 11:00 AM – 3:00 PM"}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-navy">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-ivory/75 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {brand} Center for Well-Being. All
            rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="#" className="hover:text-ivory">
              Privacy Policy
            </Link>
            <span aria-hidden>|</span>
            <Link href="#" className="hover:text-ivory">
              Terms & Conditions
            </Link>
            <span aria-hidden>|</span>
            <Link href="#" className="hover:text-ivory">
              Disclaimer
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
