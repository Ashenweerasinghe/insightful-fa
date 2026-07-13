"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

function FieldIcon({ type }: { type: "name" | "company" | "email" }) {
  return (
    <span className="text-text-muted pointer-events-none absolute left-[var(--space-sm)] top-1/2 flex -translate-y-1/2">
      {type === "name" && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="8" r="3" />
          <path d="M6 20c.8-3 2.8-5 6-5s5.2 2 6 5" />
        </svg>
      )}
      {type === "company" && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        >
          <path d="M4 20h16" />
          <path d="M6 20V6h8v14" />
          <path d="M14 10h4v10" />
          <path d="M9 9h2M9 13h2M9 17h2" />
        </svg>
      )}
      {type === "email" && (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        >
          <path d="M4 7h16v11H4z" />
          <path d="m4 8 8 6 8-6" />
        </svg>
      )}
    </span>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "Predictive Finance Blueprint request",
          from_name: "Insightful Financial Analytics website",
          name,
          company,
          email,
        }),
      });

      const result = (await response.json()) as {
        success: boolean;
        message?: string;
      };

      if (response.ok && result.success) {
        setStatus("success");
        setMessage(
          "Thank you. Your details are on their way to our team, and we will be in touch shortly.",
        );
        form.reset();
      } else {
        setStatus("error");
        setMessage(
          result.message ??
            "Something went wrong while sending your message. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "We could not reach the server. Please check your connection and try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <Stack
        gap="md"
        className="border-signal-focus bg-background-secondary rounded-md border p-[var(--space-xl)] shadow-medium"
      >
        <Heading level={2} size="heading-xl" className="text-heading-lg">
          Message received.
        </Heading>
        <Text size="body-lg" className="text-text-secondary" role="status">
          {message}
        </Text>
      </Stack>
    );
  }

  return (
    <Stack
      gap="lg"
      className="border-signal-focus bg-background-secondary rounded-md border p-[var(--space-xl)] shadow-medium"
    >
      <div className="flex items-start gap-[var(--space-md)]">
        <span className="bg-background-dark text-signal-focus flex h-16 w-16 shrink-0 items-center justify-center rounded-full">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          >
            <path d="M4 7h16v11H4z" />
            <path d="m4 8 8 6 8-6" />
            <circle cx="18" cy="6" r="3" fill="var(--background-dark)" />
            <path d="m16.8 6 0.9 0.9L19.4 5" />
          </svg>
        </span>
        <Stack gap="xs">
          <Heading level={2} size="heading-md" className="text-heading-md">
            Let&rsquo;s Start the Conversation
          </Heading>
          <Text size="body-sm" className="text-text-secondary">
            Share a few details and we&rsquo;ll be in touch with insights
            tailored to your business.
          </Text>
        </Stack>
      </div>

      <form className="flex flex-col gap-[var(--space-md)]" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-[var(--space-xs)]">
          <Text as="span" size="body-sm" className="text-text-secondary">
            Name
          </Text>
          <span className="relative">
            <FieldIcon type="name" />
            <input
              type="text"
              name="name"
              required
              className="border-border-default bg-background-primary text-text-primary placeholder:text-text-secondary focus:border-border-strong focus:outline-none w-full rounded-md border py-[var(--space-sm)] pr-[var(--space-md)] pl-[calc(var(--space-xl)+var(--space-xs))]"
            />
          </span>
        </label>
        <label className="flex flex-col gap-[var(--space-xs)]">
          <Text as="span" size="body-sm" className="text-text-secondary">
            Company Name
          </Text>
          <span className="relative">
            <FieldIcon type="company" />
            <input
              type="text"
              name="company"
              required
              className="border-border-default bg-background-primary text-text-primary placeholder:text-text-secondary focus:border-border-strong focus:outline-none w-full rounded-md border py-[var(--space-sm)] pr-[var(--space-md)] pl-[calc(var(--space-xl)+var(--space-xs))]"
            />
          </span>
        </label>
        <label className="flex flex-col gap-[var(--space-xs)]">
          <Text as="span" size="body-sm" className="text-text-secondary">
            Email
          </Text>
          <span className="relative">
            <FieldIcon type="email" />
            <input
              type="email"
              name="email"
              required
              className="border-border-default bg-background-primary text-text-primary placeholder:text-text-secondary focus:border-border-strong focus:outline-none w-full rounded-md border py-[var(--space-sm)] pr-[var(--space-md)] pl-[calc(var(--space-xl)+var(--space-xs))]"
            />
          </span>
        </label>
        <label className="flex items-start gap-[var(--space-sm)]">
          <input
            type="checkbox"
            name="consent"
            required
            className="border-border-default text-signal-focus focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-focus mt-[0.2rem] h-[var(--space-md)] w-[var(--space-md)] rounded"
          />
          <Text size="body-sm" className="text-text-secondary">
            By submitting this form, you consent to receive email from us as
            described in our{" "}
            <Link
              href="/term-of-use"
              className="text-signal-focus underline underline-offset-2"
            >
              Terms &amp; Conditions
            </Link>
            .
          </Text>
        </label>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-[var(--button-height)] items-center justify-center gap-[var(--space-sm)] rounded-md bg-background-dark px-[var(--button-padding-x)] text-body-md font-medium text-text-inverse transition duration-[var(--transition-fast)] ease-[var(--ease-soft)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-focus disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            "Sending..."
          ) : (
            <>
              Submit
              <span aria-hidden="true">&rarr;</span>
            </>
          )}
        </button>
        {status === "error" && (
          <Text size="body-sm" className="text-signal-warning" role="alert">
            {message}
          </Text>
        )}
      </form>
    </Stack>
  );
}
