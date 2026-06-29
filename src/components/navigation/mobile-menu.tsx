"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV_ITEMS, isNavItemActive } from "@/components/navigation/nav-items";
import { DURATION, EASE_SOFT } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils/cn";

/** Focusable descendants of the panel, in DOM order, for the focus trap. */
function getFocusable(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

/**
 * Mobile navigation (P2-02). Client component (local state, DEC-013): a calm
 * slide-over with a focus trap, ESC-to-close, scroll lock, generous tap targets,
 * and reduced-motion support. Hidden from md up (the desktop nav takes over).
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // The trigger is always mounted (CSS-hidden on desktop), so capturing it
    // here is stable for the cleanup focus restore.
    const trigger = triggerRef.current;

    // Move focus into the panel once it has mounted.
    const raf = requestAnimationFrame(() => {
      getFocusable(panelRef.current)[0]?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = getFocusable(panelRef.current);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="text-text-primary focus-visible:outline-signal-focus flex h-[var(--button-height)] w-[var(--button-height)] items-center justify-center transition-opacity duration-[var(--transition-fast)] ease-[var(--ease-soft)] hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="size-[1.5rem]"
        >
          <line x1="3" y1="7" x2="21" y2="7" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="17" x2="21" y2="17" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="bg-background-dark/40 fixed inset-0 z-[var(--z-modal)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduce ? 0 : DURATION.medium,
                ease: EASE_SOFT,
              }}
            />
            <motion.div
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="bg-background-primary shadow-overlay fixed top-0 right-0 z-[var(--z-modal)] flex h-dvh w-[min(85vw,360px)] flex-col overflow-y-auto px-[var(--space-lg)] py-[var(--space-lg)]"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={{
                duration: reduce ? 0 : DURATION.medium,
                ease: EASE_SOFT,
              }}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setOpen(false)}
                  className="text-text-primary focus-visible:outline-signal-focus flex h-[var(--button-height)] w-[var(--button-height)] items-center justify-center transition-opacity duration-[var(--transition-fast)] ease-[var(--ease-soft)] hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    className="size-[1.5rem]"
                  >
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Mobile" className="mt-[var(--space-xl)]">
                <ul className="flex flex-col gap-[var(--space-2xs)]">
                  {NAV_ITEMS.map((item) => {
                    const active = isNavItemActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "text-heading-md hover:text-text-primary block py-[var(--space-sm)] font-serif transition-colors duration-[var(--transition-fast)] ease-[var(--ease-soft)] motion-reduce:transition-none",
                            active
                              ? "text-text-primary"
                              : "text-text-secondary",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
