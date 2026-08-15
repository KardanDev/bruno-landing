import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import React, { useMemo } from "react";
import { AnimatedReveal } from "../animated-reveal";
import { Eyebrow } from "../blocks";
import { CtaButton } from "../cta-button";
import { CmsImage } from "../cms-image";
import { HomePage } from "@/sanity/lib/types";
import { urlFor } from "@/lib/imageUrl";
import useResponsiveImage from "@/hooks/use-responsive-image";

type Props = {
  page: HomePage;
};

const IntroductionContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();
  const selectedImage = useResponsiveImage(
    page.introductionBanner,
    page.introductionBannerMobile,
  );

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      color="ivory.50"
      minH={{ base: "auto", lg: "70vh" }}
      display="flex"
      alignItems="center"
      backgroundImage={`url(${urlFor(selectedImage)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="90% 80%"
      backgroundAttachment={"fixed"}
    >
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
                fontSize={{ base: "3xl", md: "6xl" }}
                fontWeight="400"
                letterSpacing="-0.045em"
                lineHeight="0.98"
                textAlign={{
                  base: "center",
                  md: "left",
                }}
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
                lineHeight={{
                  base: "1.34",
                  md: "1.85",
                }}
                textAlign={{
                  base: "center",
                  md: "left",
                }}
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
