import { useTranslations } from "next-intl";
import { Badge } from "./badge";

export function LiveBadge() {
  const t = useTranslations("components.badge");
  return (
    <Badge.Root tone="neutral" emphasis="solid">
      <Badge.Icon />
      <Badge.Label>{t("liveFocus")}</Badge.Label>
    </Badge.Root>
  );
}
