export function getWeekdayName(date: Date, locale?: string): string {
  return date.toLocaleDateString(locale, { weekday: "long" });
}
