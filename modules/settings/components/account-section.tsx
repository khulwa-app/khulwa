"use client";

import { Logout2 } from "@solar-icons/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/primitives";
import { signOut, useSession } from "@/services/auth";

export function AccountSection() {
  const t = useTranslations("settings.account"); const router = useRouter(); const { data } = useSession(); const user = data?.user;
  const onSignOut = async () => { await signOut(); router.push("/login"); router.refresh(); };
  return <div className="grid gap-6"><div className="rounded-panel border border-sage-300 bg-base-200 p-5"><p className="font-semibold text-sage-1000">{user?.name ?? "—"}</p><p className="mt-1 text-sm text-sage-700">{user?.email ?? ""}</p></div><Button className="w-fit" onClick={onSignOut} tone="secondary"><Logout2 className="size-4" />{t("signOut")}</Button></div>;
}
