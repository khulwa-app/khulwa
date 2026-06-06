export enum Locale {
  AR = "ar",
  EN = "en",
}

export type LocaleType = (typeof locales)[number];

export const locales = Object.values(Locale);

export const DEFAULT_LOCALE: LocaleType = Locale.EN;

export function getDirection(locale: LocaleType): "ltr" | "rtl" {
  return locale === Locale.AR ? "rtl" : "ltr";
}
