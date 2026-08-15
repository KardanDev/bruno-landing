"use client";

import { Box, Container, Text } from "@chakra-ui/react";
import { RichText } from "../rich-text";
import { Post, Settings } from "@/sanity/lib/types";
import useResponsiveImage from "@/hooks/use-responsive-image";
import { urlFor } from "@/lib/imageUrl";

type ArticleSlugContentProps = {
  settings: Settings;
  article: Post;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function ArticleSlugContent({ settings, article }: ArticleSlugContentProps) {
  const defaultBackground = useResponsiveImage(
    settings.defaultBackground,
    settings.defaultBackgroundMobile,
  );

  const backgroundUrl = urlFor(defaultBackground)?.quality(100)?.url();

  return (
    <Box
      as="article"
      position="relative"
      overflow="hidden"
      py={{ base: "20", md: "28" }}
      minH="100vh"
      width="100%"
    >
      {/* Background image */}
      <Box
        position="absolute"
        inset={0}
        zIndex={0}
        backgroundImage={`url("${backgroundUrl}")`}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="40% 20%"
        backgroundAttachment={{
          base: "scroll",
          md: "fixed",
        }}
      />

      {/* Gradient */}
      <Box
        position="absolute"
        inset={0}
        zIndex={1}
        background="linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)"
        pointerEvents="none"
      />

      {/* Content */}
      <Container
        position="relative"
        zIndex={2}
        maxW="4xl"
        px={{ base: "5", md: "8" }}
      >
        <Text
          color="ivory.200"
          fontSize="sm"
          fontWeight="700"
          mb={{ base: "8", md: "10" }}
        >
          {formatDate(article.publishedAt)}
        </Text>

        <RichText value={article.body} />
      </Container>
    </Box>
  );
}

export default ArticleSlugContent;
