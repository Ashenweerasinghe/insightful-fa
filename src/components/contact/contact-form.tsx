"use client";

import { type FormEvent, useState } from "react";
import { Stack } from "@/components/layout/stack";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

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
      <Stack gap="md">
        <Heading level={2} size="heading-xl" className="text-heading-lg lg:text-heading-xl">
          Message received.
        </Heading>
        <Text size="body-lg" className="text-text-secondary" role="status">
          {message}
        </Text>
      </Stack>
    );
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
            By submitting this form, you consent to receive email from us as
            described in our Terms &amp; Conditions.
          </Text>
        </label>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-[var(--button-height)] items-center justify-center rounded-md bg-background-dark px-[var(--button-padding-x)] text-body-md font-medium text-text-inverse transition duration-[var(--transition-fast)] ease-[var(--ease-soft)] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-focus disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit"}
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
