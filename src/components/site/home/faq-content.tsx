import { HomePage } from "@/sanity/lib/types";
import { Box, Container, Flex } from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { SectionHeading } from "../blocks";
import { CmsImage } from "../cms-image";
import { CtaButton } from "../cta-button";
import { FaqList } from "../faq-list";
import { urlFor } from "@/lib/imageUrl";

type Props = {
  page: HomePage;
};

const FaqContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bg="ivory.300"
      py={{ base: "20", md: "28" }}
      backgroundImage={`url(${urlFor(page.faqBanner)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="40% 20%"
      backgroundAttachment={"fixed"}
    >
      {/* Background image */}
      {/*{page.faqBanner && (
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
            image={page.faqBanner}
            alt={page.faqBanner.alt || ""}
            mode="cover"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </motion.div>
      )}*/}

      {/* Background overlay */}
      {/*{page.faqBanner && (
        <Box position="absolute" inset={0} zIndex={1} bg="blackAlpha.500" />
      )}*/}

      <Container
        position="relative"
        zIndex={2}
        maxW="8xl"
        px={{ base: "5", md: "8" }}
      >
        <Flex
          align={{ base: "center", md: "flex-end" }}
          direction={{ base: "column", md: "row" }}
          gap="8"
          justify="space-between"
          mb={{ base: "8", md: "12" }}
        >
          <SectionHeading
            title={page.faqTitle}
            description={page.faqDescription}
            inverse
          />
          {page.faqCta ? (
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.05, x: 4 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 16,
              }}
            >
              <CtaButton cta={page.faqCta} tone="dark" />
            </motion.div>
          ) : null}
        </Flex>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
          }
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 16,
          }}
        >
          <FaqList items={page.faqs} inverse />
        </motion.div>
      </Container>
    </Box>
  );
};

export default FaqContent;
