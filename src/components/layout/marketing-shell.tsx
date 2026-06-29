import { Navbar } from "@/components/navigation/navbar";
import { FooterCTA } from "@/components/sections/footer-cta";
import { FooterCTASlot } from "@/components/sections/footer-cta-slot";
import { Footer } from "@/components/layout/footer";

/**
 * Site-wide shell: skip link, Navbar, main, FooterCTA invitation, Footer. Used
 * by both the (marketing) group layout and the root not-found.tsx so unmatched
 * URLs inherit the same navigation as every other page.
 */
export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="bg-background-dark text-text-inverse sr-only rounded-md px-[var(--space-md)] py-[var(--space-xs)] focus:not-sr-only focus:absolute focus:top-[var(--space-md)] focus:left-[var(--space-md)] focus:z-[var(--z-modal)]"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <FooterCTASlot>
        <FooterCTA />
      </FooterCTASlot>
      <Footer />
    </>
  );
}
