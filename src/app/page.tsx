import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Metadata } from "next";
import { LuArrowDown } from "react-icons/lu";
import { AnimatedReveal } from "@/components/site/animated-reveal";
import {
  ArticleCard,
  ClosingCta,
  Eyebrow,
  SectionHeading,
  ServiceCard,
} from "@/components/site/blocks";
import { CmsImage } from "@/components/site/cms-image";
import { CtaButton } from "@/components/site/cta-button";
import { FaqList } from "@/components/site/faq-list";
import { getHomePage, getSettings } from "@/sanity/lib/content";
import { createMetadata } from "@/sanity/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([getHomePage(), getSettings()]);
  return createMetadata(page.seo, settings);
}

export default async function Home() {
  const page = await getHomePage();

  return (
    <>
      <Box
        as="section"
        bg="ink.950"
        color="ivory.50"
        minH="100vh"
        overflow="hidden"
        position="relative"
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} minH="100vh" h="100%">
          <Flex
            direction="column"
            justify="end"
            px={{ base: 6, md: 12, xl: 20 }}
            py={{ base: 24, lg: 44 }}
            position="relative"
            overflow="hidden"
          >
            {page.decorativeSignature && (
              <Box
                position="absolute"
                inset={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                pointerEvents="none"
                zIndex={0}
              >
                <CmsImage
                  image={page.decorativeSignature}
                  alt=""
                  mode="contain"
                  style={{
                    width: "130%",
                    height: "130%",
                    objectFit: "contain",
                    opacity: 0.06,
                    transform: "translate(-12%, -4%)",
                    userSelect: "none",
                    mixBlendMode: "luminosity",
                  }}
                />
              </Box>
            )}

            <Stack gap="7" position="relative" zIndex={1} maxW="2xl">
              {page.hero.eyebrow && (
                <Eyebrow color="gold.300">{page.hero.eyebrow}</Eyebrow>
              )}

              <Heading
                as="h1"
                fontFamily="heading"
                fontWeight="400"
                letterSpacing="-0.06em"
                lineHeight="0.9"
                fontSize={{
                  base: "5xl",
                  md: "6xl",
                  xl: "7xl",
                }}
              >
                {page.hero.title}
              </Heading>

              {page.hero.description && (
                <Text
                  color="ivory.200"
                  fontSize={{ base: "lg", md: "xl" }}
                  maxW="xl"
                >
                  {page.hero.description}
                </Text>
              )}

              {page.hero.cta && (
                <Box pt="2">
                  <CtaButton cta={page.hero.cta} tone="light" />
                </Box>
              )}
            </Stack>
          </Flex>

          {/* Right side */}
          <Box
            position="relative"
            h={{ base: "60vh", lg: "100vh" }}
            overflow="hidden"
          >
            <CmsImage
              alt={page.hero.image?.alt}
              fallbackLabel="MD"
              mode="cover"
              image={page.hero.image}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </SimpleGrid>
      </Box>

      <Box as="section" py={{ base: "20", md: "32" }}>
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            gap={{ base: "8", lg: "20" }}
          >
            <Stack gap="4">
              <Eyebrow>{page.introductionEyebrow}</Eyebrow>
              <AnimatedReveal>
                <Stack gap="6">
                  <Heading
                    fontFamily="heading"
                    fontSize={{ base: "4xl", md: "6xl" }}
                    fontWeight="400"
                    letterSpacing="-0.045em"
                    lineHeight="0.98"
                  >
                    {page.introductionTitle}
                  </Heading>
                </Stack>
              </AnimatedReveal>
            </Stack>
            <Stack gap="4">
              <Text
                color="ink.700"
                fontSize={{ base: "lg", md: "xl" }}
                lineHeight="1.85"
              >
                {page.introductionText}
              </Text>
              <CtaButton
                cta={{
                  href: "/about",
                  label: "Sobre nós",
                }}
                tone="outline"
              />
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" bg="surface" py={{ base: "20", md: "28" }}>
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <Flex
            align={{ base: "flex-start", md: "flex-end" }}
            direction={{ base: "column", md: "row" }}
            gap="8"
            justify="space-between"
            mb={{ base: "10", md: "14" }}
          >
            <SectionHeading
              description={page.servicesDescription}
              eyebrow={page.servicesEyebrow}
              title={page.servicesTitle}
            />
            {page.servicesCta ? (
              <CtaButton cta={page.servicesCta} tone="outline" />
            ) : null}
          </Flex>
          <Stack gap="0">
            {page.featuredServices.map((service, index) => (
              <ServiceCard index={index} key={service._id} service={service} />
            ))}
          </Stack>
        </Container>
      </Box>

      <Box
        as="section"
        bg="ink.950"
        color="ivory.50"
        py={{ base: "20", md: "28" }}
      >
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SectionHeading
            description={page.timelineDescription}
            eyebrow={page.timelineEyebrow}
            inverse
            title={page.timelineTitle}
          />
          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 4 }}
            gap={{ base: "8", md: "6" }}
            mt={{ base: "12", md: "16" }}
          >
            {page.timeline.map((step, index) => (
              <AnimatedReveal delay={index * 0.08} key={step._key}>
                <Stack
                  borderTopWidth="1px"
                  borderColor="gold.300"
                  gap="5"
                  pt="5"
                >
                  <Text
                    color="gold.300"
                    fontFamily="heading"
                    fontSize="3xl"
                    fontStyle="italic"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Heading
                    as="h2"
                    fontFamily="heading"
                    fontSize="2xl"
                    fontWeight="400"
                  >
                    {step.title}
                  </Heading>
                  <Text color="ivory.200" lineHeight="1.75">
                    {step.description}
                  </Text>
                </Stack>
              </AnimatedReveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" py={{ base: "20", md: "28" }}>
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <SectionHeading title={page.valuesTitle} />
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: "8", md: "6" }}
            mt={{ base: "12", md: "16" }}
          >
            {page.values.map((value, index) => (
              <AnimatedReveal delay={index * 0.08} key={value._key}>
                <Stack borderTopWidth="1px" borderColor="border" gap="4" pt="5">
                  <Heading
                    as="h2"
                    fontFamily="heading"
                    fontSize="3xl"
                    fontWeight="400"
                  >
                    {value.title}
                  </Heading>
                  <Text color="ink.700" lineHeight="1.75">
                    {value.description}
                  </Text>
                </Stack>
              </AnimatedReveal>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box as="section" bg="surface" py={{ base: "20", md: "28" }}>
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <Flex
            align={{ base: "flex-start", md: "flex-end" }}
            direction={{ base: "column", md: "row" }}
            gap="8"
            justify="space-between"
            mb={{ base: "8", md: "12" }}
          >
            <SectionHeading
              description={page.faqDescription}
              title={page.faqTitle}
            />
            {page.faqCta ? (
              <CtaButton cta={page.faqCta} tone="outline" />
            ) : null}
          </Flex>
          <FaqList items={page.faqs} />
        </Container>
      </Box>

      <Box as="section" py={{ base: "20", md: "28" }}>
        <Container maxW="8xl" px={{ base: "5", md: "8" }}>
          <Flex
            align={{ base: "flex-start", md: "flex-end" }}
            direction={{ base: "column", md: "row" }}
            gap="8"
            justify="space-between"
            mb={{ base: "10", md: "14" }}
          >
            <SectionHeading
              description={page.articlesDescription}
              title={page.articlesTitle}
            />
            {page.articlesCta ? (
              <CtaButton cta={page.articlesCta} tone="outline" />
            ) : null}
          </Flex>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: "10", md: "7" }}
          >
            {page.latestPosts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <ClosingCta hero={page.closingCta} />
    </>
  );
}
