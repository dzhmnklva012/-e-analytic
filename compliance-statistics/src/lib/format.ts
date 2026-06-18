const NUMBER_FORMAT = new Intl.NumberFormat("ru-RU");

/** Formats integers with non-breaking thin spaces, e.g. 12 480. */
export function formatNumber(value: number): string {
  return NUMBER_FORMAT.format(Math.round(value));
}

/** Safe percentage of part / whole, rounded to an integer. */
export function percent(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 100);
}
