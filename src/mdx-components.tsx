import type { MDXComponents } from "mdx/types";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { Divider } from "@/components/layout/divider";

/**
 * Maps MDX body elements onto the token-driven editorial primitives so resource
 * articles inherit the site's typography, spacing, and a11y treatment.
 *
 * `h1` is intentionally rendered as an <h2>: the article route owns the single
 * page <h1> (the title), so an in-body `#` must never introduce a competing
 * level-1 heading. Authors should write sections at `##`/`###`.
 *
 * Section headings use `heading-md` (32px) — the type scale has no 36px step,
 * and 32px reads calmer than the larger steps in a narrow reading column. `h3`
 * steps down to a serif body size so the heading ladder stays valid.
 */
const components: MDXComponents = {
  h1: ({ children }) => (
    <Heading level={2} size="heading-md">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading level={2} size="heading-md">
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading level={3} size="heading-md" className="text-body-lg">
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading level={4} size="heading-md" className="text-body-lg">
      {children}
    </Heading>
  ),
  p: ({ children }) => <Text size="body-lg">{children}</Text>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-text-primary decoration-border-strong hover:decoration-text-primary focus-visible:outline-signal-focus underline underline-offset-4 transition-colors duration-[var(--transition-fast)] ease-[var(--ease-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="t-body-lg marker:text-text-secondary list-disc space-y-[var(--space-2xs)] pl-[var(--space-md)]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="t-body-lg marker:text-text-secondary list-decimal space-y-[var(--space-2xs)] pl-[var(--space-md)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-border-strong text-text-secondary border-l pl-[var(--space-lg)] italic">
      {children}
    </blockquote>
  ),
  hr: () => <Divider />,
  strong: ({ children }) => <strong className="font-medium">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="bg-surface-card rounded-sm px-[var(--space-2xs)] font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-surface-card text-body-sm overflow-x-auto rounded-[var(--radius-md)] p-[var(--space-md)] font-mono [&>code]:bg-transparent [&>code]:p-0">
      {children}
    </pre>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
