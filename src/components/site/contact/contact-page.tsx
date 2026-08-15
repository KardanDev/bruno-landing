"use client";

import type { ContactPage, Settings } from "@/sanity/lib/types";
import { MotionWrapper } from "@/utils/animations";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Eyebrow } from "../blocks";
import { ContactForm } from "../contact-form";
import SocialIcon from "../social-icon";
import useResponsiveImage from "@/hooks/use-responsive-image";
import { urlFor } from "@/lib/imageUrl";

type ContactPageProps = {
  page: ContactPage;
  settings: Settings;
};

const ContactPage = ({ page, settings }: ContactPageProps) => {
  const selectedImage = useResponsiveImage(
    page.hero.image,
    page.hero.imageMobile,
  );

  return (
    <Box
      as="section"
      py={{ base: "20", md: "28" }}
      backgroundImage={`url(${urlFor(selectedImage)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="40% 20%"
      backgroundAttachment={"fixed"}
    >
      <Container
        maxW="8xl"
        px={{ base: "5", md: "8" }}
        mt={{ base: "10", md: "12" }}
      >
        <SimpleGrid
          alignItems="start"
          columns={{ base: 1, lg: 2 }}
          gap={{ base: "12", lg: "20" }}
        >
          <Stack gap="6" maxW="2xl">
            {page.hero.eyebrow ? (
              <MotionWrapper y={16} scale={0.98}>
                <Eyebrow color="gold.300">{page.hero.eyebrow}</Eyebrow>
              </MotionWrapper>
            ) : null}
            <Heading
              color="ivory.100"
              fontFamily="heading"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="400"
              letterSpacing="-0.04em"
              lineHeight="0.98"
            >
              {page.form.heading}
            </Heading>
            {page.form.description ? (
              <Text
                color="ivory.200"
                fontSize={{ base: "md", md: "lg" }}
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
              <Text color="ivory.200" fontSize="lg" lineHeight="1.75">
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
                <Link color="ivory.300" href={settings.mapUrl} target="_blank">
                  {settings.address}
                </Link>
              ) : (
                <Text color="ivory.300" lineHeight="1.75" whiteSpace="pre-line">
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
  );
};

export default ContactPage;
