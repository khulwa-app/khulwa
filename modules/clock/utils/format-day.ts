export function getWeekdayName(date: Date, locale?: string): string {
  return date.toLocaleDateString(locale, { weekday: "long" });
}

export function formatGregorianDate(date: Date, locale?: string): string {
  return date.toLocaleDateString(locale, { day: "numeric", month: "long" });
}
