export function getWeekdayName(date: Date, locale?: string): string {
  return date.toLocaleDateString(locale, { weekday: "long" });
}

export function formatGregorianDate(date: Date, locale?: string): string {
  return date.toLocaleDateString(locale, { day: "numeric", month: "long" });
}

export function formatHijriDate(date: Date, locale?: string): string {
  try {
    return new Intl.DateTimeFormat(`${locale ?? "en"}-u-ca-islamic-umalqura`, {
      day: "numeric",
      month: "long",
    }).format(date);
  } catch {
    return "";
  }
}
