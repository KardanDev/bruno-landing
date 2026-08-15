"use client";

import { Service, ServicesPage, Settings } from "@/sanity/lib/types";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Eyebrow, FeatureList } from "../blocks";
import { CmsImage } from "../cms-image";
import { CtaButton } from "../cta-button";
import { FaqList } from "../faq-list";
import { RichText } from "../rich-text";
import useResponsiveImage from "@/hooks/use-responsive-image";
import { urlFor } from "@/lib/imageUrl";

interface ServiceSlugContentProps {
  settings: Settings;
  service: Service;
  servicesPage: ServicesPage;
}

function ServiceSlugContent({ settings, service }: ServiceSlugContentProps) {
  const defaultBackground = useResponsiveImage(
    settings.defaultBackground,
    settings.defaultBackgroundMobile,
  );

  return (
    <Box
      as={"section"}
      backgroundImage={`url(${urlFor(defaultBackground)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="40% 20%"
      backgroundAttachment={{
        base: "scroll",
        md: "fixed",
      }}
      height={"100%"}
      width={"100%"}
      py={{ base: "16", md: "24" }}
    >
      <Box>
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SimpleGrid
            alignItems="center"
            columns={{ base: 1, lg: 2 }}
            gap={{ base: "12", lg: "16" }}
          >
            <Stack gap="7">
              {service.eyebrow ? (
                <Eyebrow color="gold.300">{service.eyebrow}</Eyebrow>
              ) : null}
              <Heading
                as="h1"
                fontFamily="heading"
                fontSize={{ base: "5xl", md: "7xl" }}
                fontWeight="400"
                letterSpacing="-0.055em"
                lineHeight="0.92"
              >
                {service.title}
              </Heading>
              <Text
                color="ivory.200"
                fontSize={{ base: "lg", md: "xl" }}
                lineHeight="1.75"
              >
                {service.summary}
              </Text>
              {service.cta ? (
                <Box pt="2">
                  <CtaButton cta={service.cta} tone="dark" />
                </Box>
              ) : null}
            </Stack>
            {service.heroImage && (
              <Box
                borderRadius="editorial"
                h={{ base: "80", lg: "112" }}
                overflow="hidden"
              >
                <CmsImage
                  alt={service.heroImage?.alt ?? service.title}
                  fallbackLabel="MD"
                  height={450}
                  width={450}
                  image={service.heroImage}
                />
              </Box>
            )}
          </SimpleGrid>
        </Container>
      </Box>
      <Box as="section" py={{ base: "20", md: "28" }}>
        <Container maxW="6xl" px={{ base: "5", md: "8" }}>
          <RichText value={service.body} />
        </Container>
      </Box>
      {service.faqs?.length ? (
        <Box as="section" py={{ base: "20", md: "28" }}>
          <Container maxW="6xl" px={{ base: "5", md: "8" }}>
            <Heading
              as="h2"
              fontFamily="heading"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="400"
              mb="10"
            >
              {service.faqTitle ?? "Perguntas frequentes"}
            </Heading>
            <FaqList items={service.faqs} inverse />
          </Container>
        </Box>
      ) : null}
    </Box>
  );
}

export default ServiceSlugContent;
