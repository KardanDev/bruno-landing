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
import { HomePage } from "@/sanity/lib/types";

type Props = {
  page: HomePage;
};

const IntroductionContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      color="ivory.50"
      bg="ink.950"
      as="section"
      py={{ base: "20", md: "32" }}
    >
      <Container maxW="8xl" px={{ base: "5", md: "8" }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "8", lg: "20" }}>
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
  );
};

export default IntroductionContent;
