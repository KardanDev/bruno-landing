import { HomePage } from "@/sanity/lib/types";
import { Box, Container, Flex } from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { SectionHeading } from "../blocks";
import { CtaButton } from "../cta-button";
import { FaqList } from "../faq-list";

type Props = {
  page: HomePage;
};

const FaqContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();
  return (
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
          initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
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
  );
};

export default FaqContent;
