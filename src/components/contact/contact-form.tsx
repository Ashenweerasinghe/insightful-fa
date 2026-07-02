"use client";

import { type FormEvent } from "react";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

const CONTACT_EMAIL = "connect@insightfulfa.com";

function buildMailtoUrl(name: string, company: string, email: string): string {
  const subject = encodeURIComponent("Predictive Finance Blueprint request");
  const body = encodeURIComponent(
    [
      "New contact submission:",
      `Name: ${name}`,
      `Company Name: ${company}`,
      `Email: ${email}`,
    ].join("\n"),
  );

  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    const mailtoUrl = buildMailtoUrl(name, company, email);
    window.location.href = mailtoUrl;
  }

  return (
    <Stack gap="md">
      <Heading level={2} size="heading-xl" className="text-heading-lg lg:text-heading-xl">
        Fill out the form and see the bear before it shows up. 📩
      </Heading>
      <form className="flex flex-col gap-[var(--space-md)]" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-[var(--space-xs)]">
          <Text as="span" size="body-sm" className="text-text-secondary">
            Name
          </Text>
          <input
            type="text"
            name="name"
            required
            className="border-border-default bg-background-primary text-text-primary placeholder:text-text-secondary focus:border-border-strong focus:outline-none w-full rounded-md border px-[var(--space-md)] py-[var(--space-sm)]"
          />
        </label>
        <label className="flex flex-col gap-[var(--space-xs)]">
          <Text as="span" size="body-sm" className="text-text-secondary">
            Company Name
          </Text>
          <input
            type="text"
            name="company"
            required
            className="border-border-default bg-background-primary text-text-primary placeholder:text-text-secondary focus:border-border-strong focus:outline-none w-full rounded-md border px-[var(--space-md)] py-[var(--space-sm)]"
          />
        </label>
        <label className="flex flex-col gap-[var(--space-xs)]">
          <Text as="span" size="body-sm" className="text-text-secondary">
            Email
          </Text>
          <input
            type="email"
            name="email"
            required
            className="border-border-default bg-background-primary text-text-primary placeholder:text-text-secondary focus:border-border-strong focus:outline-none w-full rounded-md border px-[var(--space-md)] py-[var(--space-sm)]"
          />
        </label>
        <label className="flex items-start gap-[var(--space-sm)]">
          <input
            type="checkbox"
            name="consent"
            required
            className="border-border-default text-signal-focus focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-focus mt-[0.2rem] h-[var(--space-md)] w-[var(--space-md)] rounded"
          />
          <Text size="body-sm" className="text-text-secondary">
            By submitting this form, you consent to receive email and SMS
            communications from us as described in our Terms &amp; Conditions.
          </Text>
        </label>
        <button
          type="submit"
          className="inline-flex h-[var(--button-height)] items-center justify-center rounded-md bg-background-dark px-[var(--button-padding-x)] text-body-md font-medium text-text-inverse transition duration-[var(--transition-fast)] ease-[var(--ease-soft)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-focus"
        >
          Submit
        </button>
      </form>
    </Stack>
  );
}
