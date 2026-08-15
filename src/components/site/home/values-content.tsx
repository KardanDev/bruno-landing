import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { SectionHeading } from "../blocks";
import { HomePage } from "@/sanity/lib/types";
import { AnimatedReveal } from "../animated-reveal";
import { urlFor } from "@/lib/imageUrl";

type Props = {
  page: HomePage;
};

const ValuesContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      as="section"
      py={{ base: "20", md: "28" }}
      backgroundImage={`url(${urlFor(page.valuesBanner)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center 40%"
      backgroundAttachment={"fixed"}
    >
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
                  reduceMotion ? undefined : { y: -8, scale: 1.02, rotate: 0.5 }
                }
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              >
                <Stack
                  borderTopWidth="1px"
                  borderColor="border"
                  gap="4"
                  pt="5"
                  textAlign={{
                    base: "center",
                    md: "start",
                  }}
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
  );
};

export default ValuesContent;
