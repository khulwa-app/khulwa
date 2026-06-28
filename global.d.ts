import type messages from "./messages/ar.json";
import type { LocaleType } from "./i18n/config";

declare module "next-intl" {
  interface AppConfig {
    Locale: LocaleType;
    Messages: typeof messages;
  }
}
