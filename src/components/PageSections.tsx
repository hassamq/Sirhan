import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export type InfoCard = {
  title: string;
  description: string;
  href?: string;
  icon?: LucideIcon;
  tone?: string;
};

export function InfoCardGrid({ cards }: { cards: InfoCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        const inner = (
          <>
            {Icon && (
              <span className="mb-5 inline-flex text-sage-deep">
                <Icon className="h-7 w-7" strokeWidth={1.35} />
              </span>
            )}
            <h3 className="font-display text-xl font-semibold text-navy">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {card.description}
            </p>
            {card.href && (
              <span className="link-arrow mt-5 text-sm">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </>
        );

        const className = `group rounded-2xl ${card.tone ?? "bg-[#f3eee6]"} p-6 transition duration-300 hover:-translate-y-1`;

        if (card.href) {
          return (
            <Link key={card.title} href={card.href} className={`${className} block`}>
              {inner}
            </Link>
          );
        }

        return (
          <article key={card.title} className={className}>
            {inner}
          </article>
        );
      })}
    </div>
  );
}

export function ContentBlock({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="section-title mb-8 text-3xl sm:text-4xl">{title}</h2>
        )}
        {children}
      </div>
    </section>
  );
}

export function SplitCta({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-navy px-7 py-10 text-center sm:px-12 sm:py-12">
          <h2 className="font-display text-3xl font-medium text-ivory sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ivory/75 sm:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="btn btn-accent">
              {primary.label}
            </Link>
            {secondary && (
              <Link
                href={secondary.href}
                className="btn border border-ivory/30 bg-transparent text-ivory hover:bg-ivory/10"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
