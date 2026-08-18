"use client";

import { BlogPage, Post } from "@/sanity/lib/types";
import { Box, Container, SimpleGrid, Stack } from "@chakra-ui/react";
import { ArticleCard } from "../blocks";
import useResponsiveImage from "@/hooks/use-responsive-image";
import { urlFor } from "@/lib/imageUrl";

type ArticlesContentProps = {
  page: BlogPage;
  articles: Post[];
};

function ArticlesContent({ page, articles }: ArticlesContentProps) {
  const articlesBannerImage = useResponsiveImage(
    page.articlesBanner,
    page.articlesBannerMobile,
  );

  return (
    <Box
      as="section"
      py={{ base: "20", md: "28" }}
      backgroundImage={`url(${urlFor(articlesBannerImage)?.quality(100)?.url()})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="40% 20%"
      backgroundAttachment={{
        base: "fixed",
        md: "fixed",
      }}
    >
      <Container maxW="8xl" px={{ base: "5", md: "8" }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          gap={{ base: "12", md: "8" }}
        >
          {articles.map((article) => (
            <ArticleCard key={article._id} post={article} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default ArticlesContent;
