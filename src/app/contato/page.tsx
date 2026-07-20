import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Metadata } from "next";
import { PageHero } from "@/components/site/blocks";
import { ContactForm } from "@/components/site/contact-form";
import { getContactPage, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";
import SocialIcon from "@/components/site/social-icon";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getContactPage(), getSettings()]);
  return createMetadata(page.seo, settings);
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContactPage(), getSettings()]);
  console.log(page);

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
            <Stack gap="6" maxW="2xl">
              <Heading
                color="ink.900"
                fontFamily="heading"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="400"
                letterSpacing="-0.04em"
                lineHeight="0.98"
              >
                {page.form.heading}
              </Heading>
              {page.form.description ? (
                <Text
                  color="ink.700"
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight="1.75"
                >
                  {page.form.description}
                </Text>
              ) : null}
              <ContactForm copy={page.form} recipient={settings.email} />
            </Stack>

            <Stack
              bg="surface"
              borderRadius="editorial"
              gap="5"
              p={{ base: "7", md: "9" }}
            >
              {page.contactNote ? (
                <Text color="ink.700" fontSize="lg" lineHeight="1.75">
                  {page.contactNote}
                </Text>
              ) : null}
              <HStack>
                {page.facebookLink && (
                  <SocialIcon icon="facebook" href={page.facebookLink} />
                )}
                {page.instagramLink && (
                  <SocialIcon icon="instagram" href={page.instagramLink} />
                )}
                {page.linkedInLink && (
                  <SocialIcon icon="linkedin" href={page.linkedInLink} />
                )}
                {page.whatsappLink && (
                  <SocialIcon icon="whatsapp" href={page.whatsappLink} />
                )}
              </HStack>
              {settings.address ? (
                settings.mapUrl ? (
                  <Link
                    color="ink.700"
                    href={settings.mapUrl}
                    lineHeight="1.75"
                    target="_blank"
                    whiteSpace="pre-line"
                    _hover={{ color: "wine.700" }}
                  >
                    {settings.address}
                  </Link>
                ) : (
                  <Text color="ink.700" lineHeight="1.75" whiteSpace="pre-line">
                    {settings.address}
                  </Text>
                )
              ) : null}
              {settings.officeHours ? (
                <Text color="ink.700" lineHeight="1.75">
                  {settings.officeHours}
                </Text>
              ) : null}
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
