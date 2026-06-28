import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "./i18n";

export default getRequestConfig(async () => {
  const locale = getUserLocale();

  return {
    locale,
    messages: (await import(`../messages/${locale.toLowerCase()}.json`)).default,
  };
});
