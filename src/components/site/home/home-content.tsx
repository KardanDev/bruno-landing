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

function Reveal({
  children,
  delay = 0,
  y = 28,
  scale = 0.94,
  rotate = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  rotate?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y, scale, rotate, filter: "blur(12px)" }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 16,
        mass: 0.9,
        delay,
      }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({
  image,
  alt,
  fallbackLabel,
}: {
  image: any;
  alt?: string;
  fallbackLabel?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1.06]);
  const rotate = useTransform(scrollYProgress, [0, 1], ["-2deg", "2deg"]);

  return (
    <motion.div ref={ref} style={{ width: "100%", height: "100%" }}>
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          y: reduceMotion ? 0 : y,
          scale: reduceMotion ? 1 : scale,
          rotate: reduceMotion ? "0deg" : rotate,
        }}
      >
        <CmsImage
          alt={alt}
          fallbackLabel={fallbackLabel}
          mode="cover"
          image={image}
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>
    </motion.div>
  );
}

function FloatingOrbs() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        aria-hidden
        initial={
          reduceMotion
            ? false
            : { opacity: 0, scale: 0.7, x: 60, y: -30, rotate: -18 }
        }
        animate={
          reduceMotion
            ? undefined
            : { opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }
        }
        transition={{ type: "spring", stiffness: 45, damping: 14 }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <Box
          bg="wine.800"
          borderRadius="full"
          filter="blur(28px)"
          h={{ base: "72", md: "120" }}
          opacity="0.8"
          position="absolute"
          right={{ base: "-48", md: "-8" }}
          top={{ base: "-18", md: "-20" }}
          w={{ base: "72", md: "120" }}
        />
        <Box
          bg="gold.300"
          borderRadius="full"
          filter="blur(40px)"
          h={{ base: "40", md: "72" }}
          opacity="0.18"
          position="absolute"
          right={{ base: "10", md: "12" }}
          top={{ base: "18", md: "24" }}
          w={{ base: "40", md: "72" }}
        />
        <Box
          bg="ivory.200"
          borderRadius="full"
          filter="blur(60px)"
          h={{ base: "28", md: "44" }}
          opacity="0.08"
          position="absolute"
          left={{ base: "-10", md: "8" }}
          bottom={{ base: "10", md: "14" }}
          w={{ base: "28", md: "44" }}
        />
      </motion.div>
    </>
  );
}

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
          filter: heroBlur as any,
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(circle at 70% 20%, rgba(212,175,55,0.08), transparent 28%), radial-gradient(circle at 20% 80%, rgba(88,17,48,0.12), transparent 30%)",
        }}
      />

      <Box as="main" position="relative" zIndex={1}>
        <Box
          as="section"
          bg="ink.950"
          color="ivory.50"
          minH="100vh"
          overflow="hidden"
          position="relative"
        >
          <FloatingOrbs />

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
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, scale: 0.92, rotate: -8 }
                  }
                  animate={
                    reduceMotion
                      ? undefined
                      : { opacity: 1, scale: 1, rotate: 0 }
                  }
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    zIndex: 0,
                  }}
                >
                  <CmsImage
                    image={page.decorativeSignature}
                    alt=""
                    mode="contain"
                    style={{
                      width: "140%",
                      height: "140%",
                      objectFit: "contain",
                      opacity: 0.06,
                      transform: "translate(-12%, -4%)",
                      userSelect: "none",
                      mixBlendMode: "luminosity",
                    }}
                  />
                </motion.div>
              )}

              <Stack gap="7" position="relative" zIndex={1} maxW="2xl">
                {page.hero.eyebrow && (
                  <Reveal delay={0.04} y={16} scale={0.98}>
                    <Eyebrow color="gold.300">{page.hero.eyebrow}</Eyebrow>
                  </Reveal>
                )}

                <Reveal delay={0.1} y={42} scale={0.92} rotate={-2}>
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
                </Reveal>

                {page.hero.description && (
                  <Reveal delay={0.18} y={24} scale={0.96}>
                    <Text
                      color="ivory.200"
                      fontSize={{ base: "lg", md: "xl" }}
                      maxW="xl"
                    >
                      {page.hero.description}
                    </Text>
                  </Reveal>
                )}

                {page.hero.cta && (
                  <Reveal delay={0.26} y={18} scale={0.94}>
                    <Box pt="2">
                      <motion.div
                        whileHover={
                          reduceMotion
                            ? undefined
                            : { scale: 1.08, x: 6, rotate: -1 }
                        }
                        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 14,
                        }}
                      >
                        <CtaButton cta={page.hero.cta} tone="dark" />
                      </motion.div>
                    </Box>
                  </Reveal>
                )}
              </Stack>
            </Flex>

            <Box
              position="relative"
              h={{ base: "60vh", lg: "100vh" }}
              overflow="hidden"
            >
              <motion.div
                initial={
                  reduceMotion ? false : { opacity: 0, scale: 1.12, rotate: 2 }
                }
                animate={
                  reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }
                }
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: "100%", height: "100%" }}
              >
                <ParallaxImage
                  alt={page.hero.image?.alt}
                  fallbackLabel="MD"
                  image={page.hero.image}
                />
              </motion.div>
            </Box>
          </SimpleGrid>
        </Box>

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
