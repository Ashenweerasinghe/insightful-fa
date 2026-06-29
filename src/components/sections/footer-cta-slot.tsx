"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * FooterCTASlot (DEC-038): suppresses the shell FooterCTA on /contact, where a
 * "Book a consultation → /contact" invitation would be circular. The server-rendered
 * FooterCTA is passed as children, so it and the layout stay server components; only
 * this tiny pathname gate opts into the client. usePathname resolves during SSR in the
 * App Router, so there is no hydration flash on /contact.
 */
export function FooterCTASlot({ children }: { children: ReactNode }) {
  return usePathname() === "/contact" ? null : <>{children}</>;
}
