"use client";
import { useTranslations } from "next-intl";
import { GridItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Logo } from "@/components/ui";

export function LoginScreen() {
  const t = useTranslations("login");
  return (
    <SimpleGrid columns={{ base: 1, md: 12 }} gap={{ base: 6, md: 0 }}>
      <GridItem display={{ base: "none", md: "block" }} colSpan={{ base: 1, md: 5 }}>
        <VStack
          p={{ md: 8, lg: 10, xl: 16 }}
          bg="bg.inverse"
          boxShadow="sm"
          minH="100vh"
          align="start"
          color="fg.inverse"
        >
          <Logo size={48} onInverse />

          <VStack gap={4} align="start" justify="center" flex={1}>
            <Text textStyle="label-md" color="primary.default">
              {t("brandPanel.eyebrow")}
            </Text>
            <Text maxW="72" textStyle="heading-h2" color="fg.inverse">
              {t("brandPanel.headline")}
            </Text>
            <Text color="fg.inverse" opacity={0.8} maxW="md">
              {t("brandPanel.description")}
            </Text>
          </VStack>

          <VStack align="start">
            <Text textStyle="body-sm" color="fg.inverse" opacity={0.7}>
              {t("brandPanel.quote")}
            </Text>
            <Text textStyle="body-sm" color="fg.inverse" opacity={0.5}>
              {t("brandPanel.quoteAttribution")}
            </Text>
          </VStack>
        </VStack>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 7 }} />
    </SimpleGrid>
  );
}
