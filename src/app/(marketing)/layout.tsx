import { MarketingShell } from "@/components/layout/marketing-shell";

/**
 * Marketing route group layout — wraps every page in (marketing) with the
 * shared editorial shell (skip link, Navbar, main, FooterCTA, Footer).
 */
export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingShell>{children}</MarketingShell>;
}
