"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { ContentBlock } from "@/components/PageSections";

export default function BookPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Book Support"
        title="Request a session or registration"
        description="Share a few details and the Sirhan team will follow up about availability, format, and next steps. This form does not collect payment."
      />

      <ContentBlock>
        <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-paper/80 p-6 sm:p-8">
          {sent ? (
            <div className="py-8 text-center">
              <h2 className="font-display text-3xl font-semibold text-navy">
                Request received
              </h2>
              <p className="mt-3 text-muted">
                Thank you. We will be in touch soon. If this is an emergency,
                please contact local emergency services.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="interest">
                  I am interested in
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="field"
                  defaultValue="Psychological Support"
                >
                  <option>Psychological Support</option>
                  <option>Career Counseling</option>
                  <option>Educational Courses</option>
                  <option>Travel Retreats</option>
                  <option>Workshops</option>
                  <option>Organisational Programmes</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="field resize-y"
                  placeholder="Tell us briefly what you are looking for..."
                />
              </div>
              <p className="text-xs leading-relaxed text-muted">
                By submitting, you agree that Sirhan may contact you about this
                request. Your information will be handled with care.
              </p>
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                Submit Request
              </button>
            </form>
          )}
        </div>
      </ContentBlock>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="field"
      />
    </div>
  );
}
