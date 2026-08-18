"use client";

import {
  Box,
  Container,
  Heading,
  Steps,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import React, { useMemo } from "react";
import { SectionHeading } from "../blocks";
import { HomePage } from "@/sanity/lib/types";
import { urlFor } from "@/lib/imageUrl";

type Props = {
  page: HomePage;
};

const TimelineContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const selectedImage = useMemo(() => {
    if (isMobile && page.timelineBannerMobile) {
      return page.timelineBannerMobile;
    }

    return page.timelineBanner;
  }, [isMobile, page.timelineBanner, page.timelineBannerMobile]);

  const backgroundImage = selectedImage
    ? urlFor(selectedImage)?.quality(100)?.url()
    : undefined;

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="ink.950"
      color="ivory.50"
      py={{ base: "16", md: "28" }}
      backgroundImage={backgroundImage ? `url(${backgroundImage})` : undefined}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center bottom"
      backgroundAttachment={{ base: "fixed", md: "fixed" }}
    >
      {/* Background overlay */}
      {/*<Box
        position="absolute"
        inset={0}
        bgGradient={{
          base: "linear(to-b, blackAlpha.900 0%, blackAlpha.800 45%, blackAlpha.950 100%)",
          lg: "linear(to-r, blackAlpha.850 0%, blackAlpha.700 50%, blackAlpha.850 100%)",
        }}
      />*/}

      <Container
        position="relative"
        zIndex={1}
        maxW="8xl"
        px={{ base: "5", md: "8" }}
      >
        <SectionHeading
          description={page.timelineDescription}
          eyebrow={page.timelineEyebrow}
          inverse
          title={page.timelineTitle}
        />

        <Box mt={{ base: "12", md: "20" }}>
          <Steps.Root
            defaultStep={0}
            count={page.timeline.length}
            orientation={isMobile ? "vertical" : "horizontal"}
            display={{ base: "block", md: "grid" }}
          >
            <Steps.List
              width="100%"
              gap="0"
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
            >
              {page.timeline.map((step, index) => (
                <Steps.Item
                  key={step._key}
                  index={index}
                  flex={{ base: "none", md: "1" }}
                  width={{ base: "100%", md: "auto" }}
                >
                  <Steps.Trigger
                    width="100%"
                    color="inherit"
                    display="flex"
                    alignItems="center"
                    justifyContent={{ base: "flex-start", md: "center" }}
                    gap="4"
                    py={{ base: "3", md: "0" }}
                    textAlign={{ base: "left", md: "center" }}
                    cursor="pointer"
                    _hover={{
                      bg: "transparent",
                    }}
                  >
                    <Steps.Indicator
                      flexShrink={0}
                      width={{ base: "10", md: "12" }}
                      height={{ base: "10", md: "12" }}
                      borderWidth="1px"
                      borderColor="gold.300"
                      bg="ink.950"
                      color="gold.300"
                      fontFamily="heading"
                      fontSize="md"
                      fontWeight="500"
                      transition="all 0.25s ease"
                      _complete={{
                        bg: "gold.300",
                        color: "ink.950",
                        borderColor: "gold.300",
                        boxShadow: "0 0 0 5px rgba(212, 175, 55, 0.12)",
                      }}
                      _current={{
                        bg: "gold.300",
                        color: "ink.950",
                        borderColor: "gold.300",
                        boxShadow: "0 0 0 5px rgba(212, 175, 55, 0.12)",
                      }}
                      _hover={{
                        borderColor: "gold.200",
                        transform: "scale(1.05)",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Steps.Indicator>

                    <Steps.Title
                      color="ivory.300"
                      fontFamily="heading"
                      fontSize={{ base: "md", md: "xl" }}
                      fontWeight="400"
                      lineHeight="1.3"
                      transition="color 0.25s ease"
                      _current={{
                        color: "ivory.50",
                      }}
                    >
                      {step.title}
                    </Steps.Title>
                  </Steps.Trigger>

                  <Steps.Separator
                    _complete={{
                      bg: "gold.300",
                    }}
                  />
                </Steps.Item>
              ))}
            </Steps.List>

            {page.timeline.map((step, index) => (
              <Steps.Content
                key={step._key}
                index={index}
                width="100%"
                minWidth="0"
                pt={{ base: "10", md: "12" }}
              >
                <motion.div
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
                        }
                  }
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Box
                    width="100%"
                    maxW="3xl"
                    mx="auto"
                    px={{ base: "0", md: "8" }}
                    py={{ base: "7", md: "10" }}
                    textAlign="center"
                    borderTopWidth="1px"
                    borderBottomWidth="1px"
                    borderColor="whiteAlpha.200"
                  >
                    <Text
                      color="gold.300"
                      fontFamily="heading"
                      fontSize="sm"
                      letterSpacing="0.2em"
                      textTransform="uppercase"
                      mb="4"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Text>

                    <Heading
                      as="h2"
                      fontFamily="heading"
                      fontSize={{ base: "2xl", md: "3xl" }}
                      fontWeight="400"
                      color="ivory.50"
                      lineHeight="1.2"
                      mb="5"
                    >
                      {step.title}
                    </Heading>

                    <Text
                      color="ivory.200"
                      fontSize={{ base: "md", md: "lg" }}
                      lineHeight="1.8"
                      maxW="2xl"
                      mx="auto"
                    >
                      {step.description}
                    </Text>
                  </Box>
                </motion.div>
              </Steps.Content>
            ))}
          </Steps.Root>
        </Box>
      </Container>
    </Box>
  );
};

export default TimelineContent;
