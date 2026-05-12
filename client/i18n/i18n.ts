"use server";

import { cookies } from "next/headers";
import { DEFAULT_LOCALE, locales, type LocaleType } from "./config";
import { KHULWA_LOCALE_COOKIE_NAME } from "./constants";

export async function getUserLocale(): Promise<LocaleType> {
  const cookieLocale = (await cookies()).get(KHULWA_LOCALE_COOKIE_NAME)?.value;

  const accepted =
    !!cookieLocale && locales.includes(cookieLocale.toLowerCase() as LocaleType);

  return accepted ? (cookieLocale as LocaleType) : DEFAULT_LOCALE;
}
