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
import { SectionHeading } from "../blocks";
import { HomePage } from "@/sanity/lib/types";

type Props = {
  page: HomePage;
};

const TimelineContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
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
                  reduceMotion ? undefined : { y: -8, scale: 1.02, rotate: -1 }
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
  );
};

export default TimelineContent;
