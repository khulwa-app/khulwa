"use client";

import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Box, Button, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, Fire, HeadphonesRound, Target } from "@solar-icons/react";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui";
import { Routes } from "@/constants";

const FEATURES = [
  { icon: Target, title: "features.0.title", body: "features.0.body" },
  { icon: HeadphonesRound, title: "features.1.title", body: "features.1.body" },
  { icon: Fire, title: "features.2.title", body: "features.2.body" },
] as const;

export function Landing() {
  const t = useTranslations("landing");

  return (
    <Box position="relative" minH="100vh" overflow="hidden" bg="bg">
      <Box position="absolute" inset={0} layerStyle="space-backdrop" pointerEvents="none" aria-hidden />

      <Flex
        position="relative"
        zIndex={1}
        as="header"
        align="center"
        justify="space-between"
        paddingInline={{ base: "5", md: "10" }}
        paddingBlock="5"
      >
        <Logo size="7" href={Routes.Landing} />
        <HStack gap="2">
          <Button asChild variant="ghost.panel" size="sm">
            <NextLink href={Routes.Login}>{t("nav.signIn")}</NextLink>
          </Button>
          <Button asChild variant="solid" size="sm">
            <NextLink href={Routes.Login}>{t("nav.getStarted")}</NextLink>
          </Button>
        </HStack>
      </Flex>

      <VStack
        position="relative"
        zIndex={1}
        textAlign="center"
        gap="7"
        maxW="2xl"
        mx="auto"
        paddingInline="6"
        paddingTop={{ base: "16", md: "24" }}
      >
        <VStack gap="4">
          <Text textStyle="overline" color="primary.solid">
            {t("hero.eyebrow")}
          </Text>
          <Text textStyle="display-xl" color="fg" maxW="xl">
            {t("hero.headline")}
          </Text>
          <Text textStyle="body-lg" color="fg.muted" maxW="lg">
            {t("hero.subcopy")}
          </Text>
        </VStack>

        <Button asChild variant="solid" size="lg">
          <NextLink href={Routes.Login}>
            {t("hero.cta")}
            <Icon icon={ArrowRight} boxSize="4.5" />
          </NextLink>
        </Button>
      </VStack>

      <SimpleGrid
        position="relative"
        zIndex={1}
        columns={{ base: 1, md: 3 }}
        gap="5"
        maxW="4xl"
        mx="auto"
        paddingInline="6"
        paddingBlock={{ base: "16", md: "24" }}
      >
        {FEATURES.map(({ icon, title, body }) => (
          <VStack
            key={title}
            layerStyle="card"
            padding="6"
            align="start"
            gap="3"
            rounded="3xl"
          >
            <Flex
              boxSize="10"
              align="center"
              justify="center"
              rounded="md"
              bg="primary.subtle"
              color="primary.solid"
            >
              <Icon icon={icon} boxSize="5" />
            </Flex>
            <Text textStyle="heading-h4" color="fg">
              {t(title)}
            </Text>
            <Text textStyle="body-sm" color="fg.muted">
              {t(body)}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>

      <Text
        position="relative"
        zIndex={1}
        textStyle="body-sm"
        color="fg.disabled"
        textAlign="center"
        paddingBottom="10"
      >
        {t("quote.text")} {t("quote.attribution")}
      </Text>
    </Box>
  );
}
