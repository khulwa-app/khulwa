import { toast as sonner } from "sonner";

/**
 * One call shape for the whole product. Everything takes an already-translated string — resolve
 * `t(key)` at the call site rather than passing `t` in, so this stays free of i18n coupling.
 */
export const toast = {
  success: (title: string) => sonner.success(title),
  error: (title: string) => sonner.error(title),
  info: (title: string) => sonner.message(title),
};
