"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isNavItemActive } from "@/components/navigation/nav-items";
import { cn } from "@/lib/utils/cn";

/**
 * Desktop primary navigation links (DEC-040). Client component so the current page
 * can be marked with aria-current + a calm color shift (secondary → primary). The
 * Navbar shell itself stays a server component and simply renders this child.
 */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-[var(--space-lg)]">
        {NAV_ITEMS.map((item) => {
          const active = isNavItemActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-body-sm hover:text-text-primary transition-colors duration-[var(--transition-fast)] ease-[var(--ease-soft)] motion-reduce:transition-none",
                  active ? "text-text-primary" : "text-text-secondary",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
