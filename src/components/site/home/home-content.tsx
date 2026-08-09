"use client";

import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { Metadata } from "next";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
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
import { getHomePage } from "@/sanity/lib/content";
import { HomePage } from "@/sanity/lib/types";
import { FloatingOrbs, Reveal, ParallaxImage } from "@/utils/animations";
import HeroContent from "./hero-content";

function HomeContent({ page }: { page: HomePage }) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });
  const heroGlow = useTransform(progress, [0, 0.18], [0.26, 0.06]);
  const heroScale = useTransform(progress, [0, 0.22], [1, 0.965]);
  const heroBlur = useTransform(progress, [0, 0.22], ["0px", "10px"]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          opacity: heroGlow,
          scale: heroScale,
          filter: heroBlur,
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(circle at 70% 20%, rgba(212,175,55,0.08), transparent 28%), radial-gradient(circle at 20% 80%, rgba(88,17,48,0.12), transparent 30%)",
        }}
      />

      <Box position="relative" zIndex={1}>
        <HeroContent page={page} />

        <Box
          color="ivory.50"
          bg="ink.950"
          as="section"
          py={{ base: "20", md: "32" }}
        >
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
                  color="ivory.100"
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight="1.85"
                >
                  {page.introductionText}
                </Text>
                <motion.div
                  whileHover={reduceMotion ? undefined : { x: 8, scale: 1.02 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <CtaButton
                    cta={{
                      href: "/about",
                      label: "Sobre nós",
                    }}
                    tone="outline"
                  />
                </motion.div>
              </Stack>
            </SimpleGrid>
          </Container>
        </Box>

        <Box
          as="section"
          bg="ink.950"
          color="ivory.50"
          py={{ base: "20", md: "28" }}
        >
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
                inverse
              />
              {page.servicesCta ? (
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.05, x: 4 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 280, damping: 16 }}
                >
                  <CtaButton cta={page.servicesCta} tone="outline" />
                </motion.div>
              ) : null}
            </Flex>

            <Stack gap="0">
              {page.featuredServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 46, rotateX: -15 }
                  }
                  whileInView={
                    reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }
                  }
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    type: "spring",
                    stiffness: 65,
                    damping: 16,
                    delay: index * 0.1,
                  }}
                  style={{ transformPerspective: 1200 }}
                >
                  <motion.div
                    whileHover={
                      reduceMotion ? undefined : { x: 10, scale: 1.01 }
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <ServiceCard index={index} service={service} />
                  </motion.div>
                </motion.div>
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
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -8, scale: 1.02, rotate: -1 }
                    }
                    transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  >
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
                  </motion.div>
                </AnimatedReveal>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" py={{ base: "20", md: "28" }}>
          <Container maxW="8xl" px={{ base: "5", md: "8" }}>
            <SectionHeading title={page.valuesTitle} inverse />
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: "8", md: "6" }}
              mt={{ base: "12", md: "16" }}
            >
              {page.values.map((value, index) => (
                <AnimatedReveal delay={index * 0.08} key={value._key}>
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -8, scale: 1.02, rotate: 0.5 }
                    }
                    transition={{ type: "spring", stiffness: 240, damping: 18 }}
                  >
                    <Stack
                      borderTopWidth="1px"
                      borderColor="border"
                      gap="4"
                      pt="5"
                    >
                      <Heading
                        as="h2"
                        fontFamily="heading"
                        fontSize="3xl"
                        fontWeight="400"
                      >
                        {value.title}
                      </Heading>
                      <Text color="ivory.100" lineHeight="1.75">
                        {value.description}
                      </Text>
                    </Stack>
                  </motion.div>
                </AnimatedReveal>
              ))}
            </SimpleGrid>
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
                inverse
              />
              {page.articlesCta ? (
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.05, x: 4 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 280, damping: 16 }}
                >
                  <CtaButton cta={page.articlesCta} tone="outline" />
                </motion.div>
              ) : null}
            </Flex>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: "10", md: "7" }}
            >
              {page.latestPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 40, rotateX: -12 }
                  }
                  whileInView={
                    reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }
                  }
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 16,
                    delay: index * 0.1,
                  }}
                  style={{ transformPerspective: 1200 }}
                >
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -10, scale: 1.03, rotate: -1 }
                    }
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  >
                    <ArticleCard post={post} />
                  </motion.div>
                </motion.div>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box as="section" bg="ivory.200" py={{ base: "20", md: "28" }}>
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
                <motion.div
                  whileHover={reduceMotion ? undefined : { scale: 1.05, x: 4 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 280, damping: 16 }}
                >
                  <CtaButton cta={page.faqCta} tone="outline" />
                </motion.div>
              ) : null}
            </Flex>

            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }
              }
              whileInView={
                reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
              }
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 70, damping: 16 }}
            >
              <FaqList items={page.faqs} />
            </motion.div>
          </Container>
        </Box>

        <ClosingCta hero={page.closingCta} />
      </Box>
    </>
  );
}

export default HomeContent;
