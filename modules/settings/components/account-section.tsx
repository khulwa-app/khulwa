"use client";

import { Button, Text, VStack } from "@chakra-ui/react";
import { Logout2 } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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
    <VStack align="stretch" gap="4">
      <VStack align="stretch" gap="0.5">
        <Text textStyle="body-md" color="fg">
          {user?.name ?? "—"}
        </Text>
        <Text textStyle="body-sm" color="fg.muted">
          {user?.email ?? ""}
        </Text>
      </VStack>
      <Button variant="outline" size="sm" alignSelf="start" onClick={onSignOut}>
        <Icon icon={Logout2} boxSize="3.5" />
        {t("signOut")}
      </Button>
    </VStack>
  );
}
