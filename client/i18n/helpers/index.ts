import { setCookie } from "cookies-next/client";
import { KHULWA_LOCALE_COOKIE_NAME } from "../constants";

export const setLocaleCookie = (locale: string) => {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  setCookie(KHULWA_LOCALE_COOKIE_NAME, locale.toLowerCase(), { expires });
};
