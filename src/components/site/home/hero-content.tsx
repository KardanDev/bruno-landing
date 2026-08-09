import { Reveal, ParallaxImage } from "@/utils/animations";
import { Box, Flex, Stack, Heading, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { Eyebrow } from "../blocks";
import { CtaButton } from "../cta-button";
import { HomePage } from "@/sanity/lib/types";

type Props = {
  page: HomePage;
};

const HeroContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <Box position="relative" minH="100vh" h="100%" overflow="hidden">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 1, rotate: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
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
        <ParallaxImage
          alt={page.hero.image?.alt}
          fallbackLabel="MD"
          mode="contain"
          image={page.hero.image}
          useTransformProps={false}
        />
      </motion.div>

      <Box
        position="absolute"
        inset={0}
        zIndex={1}
        bgGradient={{
          base: "linear(to-t, blackAlpha.900 0%, blackAlpha.700 35%, blackAlpha.200 75%, transparent 100%)",
          lg: "linear(to-r, blackAlpha.800 0%, blackAlpha.500 35%, blackAlpha.100 65%, transparent 100%)",
        }}
      />

      {/* Content */}
      <Flex
        position="relative"
        zIndex={3}
        direction="column"
        justify="end"
        minH="100vh"
        px={{ base: 6, md: 12, xl: 20 }}
        py={{ base: 24, lg: 44 }}
      >
        <Stack gap="7" maxW="2xl" align="start">
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
              textAlign="left"
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
                textAlign="left"
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
                    reduceMotion ? undefined : { scale: 1.08, x: 6, rotate: -1 }
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
    </Box>
  );
};

export default HeroContent;
