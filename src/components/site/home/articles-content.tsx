import { Box, Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { motion, useReducedMotion } from "motion/react";
import React from "react";
import { SectionHeading, ArticleCard } from "../blocks";
import { CtaButton } from "../cta-button";
import { HomePage } from "@/sanity/lib/types";
import { urlFor } from "@/lib/imageUrl";

type Props = {
  page: HomePage;
};

const ArticlesContent = ({ page }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <Box
      as="section"
      py={{ base: "20", md: "28" }}
      backgroundImage={`url(${urlFor(page.articlesBanner)?.quality(100)?.url()})`}
      backgroundSize="auto"
      backgroundRepeat="no-repeat"
      backgroundPosition="0% 0%"
      backgroundAttachment={"fixed"}
    >
      <Container maxW="8xl" px={{ base: "5", md: "8" }}>
        <Flex
          align={{ base: "flex-start", md: "flex-end" }}
          direction={{ base: "column", md: "row" }}
          gap="8"
          justify="space-between"
          mb={{ base: "10", md: "14" }}
        >
          <SectionHeading
            description={page.articlesDescription}
            title={page.articlesTitle}
            inverse
          />
          {page.articlesCta ? (
            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.05, x: 4 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 16 }}
            >
              <CtaButton cta={page.articlesCta} tone="outline" />
            </motion.div>
          ) : null}
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "10", md: "7" }}>
          {page.latestPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={
                reduceMotion ? false : { opacity: 0, y: 40, rotateX: -12 }
              }
              whileInView={
                reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }
              }
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 16,
                delay: index * 0.1,
              }}
              style={{ transformPerspective: 1200 }}
            >
              <motion.div
                whileHover={
                  reduceMotion ? undefined : { y: -10, scale: 1.03, rotate: -1 }
                }
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                <ArticleCard post={post} />
              </motion.div>
            </motion.div>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ArticlesContent;
