import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { NavLinks } from "@/components/navigation/nav-links";

/**
 * Primary site navigation (P2-01). Server component: a calm, sticky top bar with
 * a wordmark, inline desktop links, and the client MobileMenu trigger on small
 * screens. No nav CTA — the conversation invitation lives in the FooterCTA.
 */
export function Navbar() {
  return (
    <header className="border-border-subtle bg-background-primary sticky top-0 z-[var(--z-navigation)] border-b">
      <Container width="wide">
        <div className="flex items-center justify-between py-[var(--space-xs)]">
          <Link
            href="/"
            aria-label="Insightful Financial Analytics"
            className="text-text-primary inline-flex items-center transition-opacity duration-[var(--transition-fast)] ease-[var(--ease-soft)] hover:opacity-70 motion-reduce:transition-none"
          >
            <Logo
              variant="lockup"
              decorative
              className="h-[var(--space-xl)] w-auto"
            />
          </Link>

          <NavLinks />

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
