export enum Locale {
  AR = "ar",
  EN = "en",
}

export type LocaleType = (typeof locales)[number];

export const locales = Object.values(Locale);

export const DEFAULT_LOCALE: LocaleType = Locale.EN;
