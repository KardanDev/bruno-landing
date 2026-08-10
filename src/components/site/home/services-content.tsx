"use client";

import {
  Box,
  Container,
  Flex,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import React, { useMemo } from "react";
import { SectionHeading, ServiceCard } from "../blocks";
import { CtaButton } from "../cta-button";
import { CmsImage } from "../cms-image";
import { HomePage } from "@/sanity/lib/types";

type Props = {
  page: HomePage;
};

const ServicesContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const selectedImage = useMemo(() => {
    if (isMobile && page.servicesBannerMobile) {
      return page.servicesBannerMobile;
    }

    return page.servicesBanner;
  }, [isMobile, page.servicesBanner, page.servicesBannerMobile]);

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="ink.950"
      color="ivory.50"
      py={{ base: "20", md: "20" }}
    >
      {/* Background image */}
      {selectedImage && (
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
            image={selectedImage}
            alt={selectedImage?.alt || ""}
            mode="cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
            }}
          />
        </motion.div>
      )}

      {/* Background overlay */}
      {selectedImage && (
        <Box
          position="absolute"
          inset={0}
          zIndex={1}
          bgGradient={{
            base: "linear(to-t, blackAlpha.900 0%, blackAlpha.700 30%, blackAlpha.300 70%)",
            lg: "linear(to-b, blackAlpha.800 0%, blackAlpha.600 25%, blackAlpha.200 50%, transparent 50%)",
          }}
        />
      )}

      <Container
        position="relative"
        zIndex={2}
        maxW="8xl"
        px={{ base: "5", md: "8" }}
      >
        <Flex
          align={{ base: "flex-start", md: "flex-end" }}
          direction={{ base: "column", md: "row" }}
          gap="8"
          justify="space-between"
          mb={{ base: "10", md: "14" }}
        >
          <SectionHeading
            eyebrow={page.servicesEyebrow}
            title={page.servicesTitle}
            inverse
          />

          {page.servicesCta ? (
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.05, x: 4 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 16,
              }}
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
                whileHover={reduceMotion ? undefined : { x: 10, scale: 1.01 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <ServiceCard index={index} service={service} />
              </motion.div>
            </motion.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default ServicesContent;
