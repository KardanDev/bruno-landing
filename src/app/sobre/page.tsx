import { Box, Container, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  ClosingCta,
  Eyebrow,
  PageHero,
  SectionHeading,
} from "@/components/site/blocks";
import { CmsImage } from "@/components/site/cms-image";
import { RichText } from "@/components/site/rich-text";
import { getAboutPage, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getAboutPage(), getSettings()]);
  return createMetadata(page.seo, settings);
}

export default async function AboutPage() {
  const page = await getAboutPage();

  return (
    <>
      <PageHero hero={page.hero} />
      <Box as="section" py={{ base: "20", md: "28" }}>
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SimpleGrid
            alignItems="start"
            columns={{ base: 1, lg: 2 }}
            gap={{ base: "12", lg: "20" }}
          >
            <Stack gap="5">
              <Eyebrow>{page.storyEyebrow}</Eyebrow>
              <SectionHeading title={page.storyTitle} inverse />
              <Box
                display={{ base: "none", lg: "block" }}
                borderRadius="editorial"
                h="96"
                mt="6"
                overflow="hidden"
              >
                <CmsImage
                  alt={page.portrait?.alt}
                  fallbackLabel="MD"
                  image={page.portrait}
                />
              </Box>
            </Stack>
            <Stack gap="8">
              <RichText value={page.story} />
              <Box
                display={{ base: "block", lg: "none" }}
                borderRadius="editorial"
                h="80"
                overflow="hidden"
              >
                <CmsImage
                  alt={page.portrait?.alt}
                  fallbackLabel="MD"
                  image={page.portrait}
                />
              </Box>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
      <Box as="section" bg="ink.950" py={{ base: "20", md: "0" }}>
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SectionHeading title={page.valuesTitle} inverse />
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: "8", md: "6" }}
            mt={{ base: "12", md: "16" }}
          >
            {page.values.map((value) => (
              <Stack
                borderTopWidth="1px"
                borderColor="border"
                gap="4"
                key={value._key}
                pt="5"
              >
                <Text color="ivory.100" fontFamily="heading" fontSize="3xl">
                  {value.title}
                </Text>
                <Text color="ink.700" lineHeight="1.75">
                  {value.description}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Box
        as="section"
        bg="ink.950"
        color="ivory.50"
        py={{ base: "16", md: "20" }}
      >
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="8">
            {page.stats.map((stat) => (
              <Stack key={stat._key}>
                <Text
                  color="gold.300"
                  fontFamily="heading"
                  fontSize={{ base: "5xl", md: "6xl" }}
                  fontStyle="italic"
                >
                  {stat.value}
                </Text>
                <Text color="ivory.200" fontSize="lg">
                  {stat.label}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <ClosingCta hero={page.closingCta} />
    </>
  );
}
