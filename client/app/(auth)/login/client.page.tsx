"use client";
import { useTranslations } from "next-intl";
import { Card, GridItem, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Box, Logo } from "@/components/ui";

export function LoginPage() {
  const t = useTranslations("login");
  return (
    <SimpleGrid columns={{ base: 1, md: 12 }} gap={{ base: 6, md: 0 }}>
      <GridItem display={{ base: "none", md: "block" }} colSpan={{ base: 1, md: 5 }}>
        <Card.Root p={{ md: 8, lg: 10, xl: 16 }} variant="login-page" minH="100vh">
          <VStack flex={1} align="start">
            <Logo variant="light" height={64} />    

            <VStack gap={4} align="start" justify="center" flex={1}>
              <Text textStyle="eyebrow" color="white/50">
                {t("brandPanel.eyebrow")}
              </Text>
              <Text maxW="72" textStyle="heading-h2" color="white">
                {t("brandPanel.headline")}
              </Text>
              <Text color="white/85" maxW="md">
                {t("brandPanel.description")}
              </Text>
            </VStack>

            <VStack align="start">
              <Text textStyle="body-sm" color="white/75">
                {t("brandPanel.quote")}
              </Text>
              <Text textStyle="body-xs" color="white/55">
                {t("brandPanel.quoteAttribution")}
              </Text>
            </VStack>
          </VStack>
        </Card.Root>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 7 }}>
        <Box height="20">Column 2</Box>
      </GridItem>
    </SimpleGrid>
  );
}
