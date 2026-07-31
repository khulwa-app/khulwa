"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/shadcn/button";
import { signOut, useSession } from "@/services/auth";

export function AccountSection() {
  const t = useTranslations("settings.account");
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const onSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm">{user?.name ?? "—"}</p>
        <p className="text-sm text-foreground-muted">{user?.email ?? ""}</p>
      </div>
      <Button variant="outline" size="sm" onClick={onSignOut}>
        <LogOut />
        {t("signOut")}
      </Button>
    </div>
  );
}
