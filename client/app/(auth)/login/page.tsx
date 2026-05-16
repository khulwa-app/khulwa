import { Card, Center, GridItem, SimpleGrid } from "@chakra-ui/react";
import { Box } from "@/components/ui";

export default function Page() {
  return (
    <SimpleGrid minH="100vh" columns={{ base: 2, md: 5 }} gap={{ base: "24px", md: "40px" }}>
      <GridItem h="full" colSpan={{ base: 1, md: 2 }}>
        <Card.Root variant="login-page" minH="100vh">
          <Card.Body h="full">
            <Center>Centered</Center>
          </Card.Body>
        </Card.Root>
      </GridItem>
      <GridItem colSpan={{ base: 1, md: 3 }}>
        <Box height="20">Column 2</Box>
      </GridItem>
    </SimpleGrid>
  );
}
