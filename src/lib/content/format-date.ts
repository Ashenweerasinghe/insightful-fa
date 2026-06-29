/** Format an ISO date (YYYY-MM-DD) as a calm editorial date, e.g. "May 12, 2026". */
export function formatPublishedDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
