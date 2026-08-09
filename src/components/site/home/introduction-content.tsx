import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { AnimatedReveal } from "../animated-reveal";
import { Eyebrow } from "../blocks";
import { CtaButton } from "../cta-button";
import { CmsImage } from "../cms-image";
import { HomePage } from "@/sanity/lib/types";

type Props = {
  page: HomePage;
};

const IntroductionContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      color="ivory.50"
      minH={{ base: "auto", lg: "70vh" }}
      display="flex"
      alignItems="center"
    >
      {/* Background image */}
      {page.introductionBanner && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <CmsImage
            image={page.introductionBanner}
            alt={page.introductionBanner.alt || ""}
            mode="cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </motion.div>
      )}

      {/* Dark overlay */}
      <Box
        position="absolute"
        inset={0}
        zIndex={1}
        bgGradient={{
          base: "linear(to-t, blackAlpha.900 0%, blackAlpha.700 45%, blackAlpha.300 100%)",
          lg: "linear(to-r, blackAlpha.800 0%, blackAlpha.600 40%, blackAlpha.200 75%, transparent 100%)",
        }}
      />

      {/* Content */}
      <Container
        position="relative"
        zIndex={2}
        maxW="8xl"
        px={{ base: "5", md: "8" }}
        py={{ base: "20", md: "32" }}
      >
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "8", lg: "20" }}>
          <Stack gap="5">
            {page.introductionEyebrow && (
              <AnimatedReveal>
                <Eyebrow color="gold.300">{page.introductionEyebrow}</Eyebrow>
              </AnimatedReveal>
            )}

            <AnimatedReveal>
              <Heading
                fontFamily="heading"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="400"
                letterSpacing="-0.045em"
                lineHeight="0.98"
              >
                {page.introductionTitle}
              </Heading>
            </AnimatedReveal>
          </Stack>

          <Stack gap="4">
            <AnimatedReveal>
              <Text
                color="ivory.100"
                fontSize={{ base: "lg", md: "xl" }}
                lineHeight="1.85"
              >
                {page.introductionText}
              </Text>
            </AnimatedReveal>

            <motion.div
              whileHover={reduceMotion ? undefined : { x: 8, scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
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
  );
};

export default IntroductionContent;
