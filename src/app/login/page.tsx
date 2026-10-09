"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { ContentBlock } from "@/components/PageSections";

export default function LoginPage() {
  const [note, setNote] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setNote(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Member access"
        title="Login"
        description="Access your Sirhan account for bookings, resources, and programme updates. Full authentication will connect once the platform backend is ready."
      />

      <ContentBlock>
        <div className="mx-auto max-w-md rounded-2xl border border-line bg-paper/80 p-6 sm:p-8">
          {note ? (
            <div className="text-center">
              <h2 className="font-display text-2xl font-semibold text-navy">
                Coming soon
              </h2>
              <p className="mt-3 text-sm text-muted">
                Member login is being prepared. For now, please book support or
                contact the team directly.
              </p>
              <Link href="/book" className="btn btn-primary mt-6 inline-flex">
                Book Support
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="email">
                  Email
                </label>
                <input id="email" type="email" required className="field" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="password">
                  Password
                </label>
                <input id="password" type="password" required className="field" />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Continue
              </button>
              <p className="text-center text-sm text-muted">
                Need help?{" "}
                <Link href="/book" className="text-sage-deep hover:text-navy">
                  Contact Sirhan
                </Link>
              </p>
            </form>
          )}
        </div>
      </ContentBlock>
    </>
  );
}
