"use client";

import { getCookie } from "cookies-next/client";
import { useCallback, useEffect } from "react";
import { useLocale } from "next-intl";
import { DEFAULT_LOCALE, locales, type LocaleType } from "@/i18n/config";
import { KHULWA_LOCALE_COOKIE_NAME } from "@/i18n/constants";
import { setLocaleCookie } from "@/i18n/helpers";

const useUpdateLocaleAndReload = () => {
  const currentLocale = useLocale();

  return useCallback(
    (nextLocale: string) => {
      setLocaleCookie(nextLocale);
      if (currentLocale !== nextLocale) {
        window.location.reload();
      }
    },
    [currentLocale],
  );
};

export const useInitLocale = () => {
  const updateLocaleAndReload = useUpdateLocaleAndReload();

  useEffect(() => {
    const cookieLocale = getCookie(KHULWA_LOCALE_COOKIE_NAME);
    const accepted =
      !!cookieLocale && locales.includes(cookieLocale.toLowerCase() as LocaleType);
    const locale = accepted ? (cookieLocale as string) : DEFAULT_LOCALE;
    updateLocaleAndReload(locale);
  }, [updateLocaleAndReload]);
};
