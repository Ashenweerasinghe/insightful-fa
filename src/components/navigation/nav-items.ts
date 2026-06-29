export interface NavItem {
  label: string;
  href: string;
}

/**
 * Primary navigation — the five v1 pages (DEC-014). Single source of truth
 * shared by the Navbar, the MobileMenu, and the Footer navigation column.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Framework", href: "/framework" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

/**
 * A nav item is active on its exact route or any nested route beneath it
 * (DEC-040). Shared by the desktop NavLinks and the MobileMenu.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
